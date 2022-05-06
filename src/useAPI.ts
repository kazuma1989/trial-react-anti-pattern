import useSWR from "swr"
import { useLoadingModalRef } from "./GoodGlobalLoadingModal"

export function useAPI(
  route: "GET /users/:id",
  params: {
    id: string
  } | null
): [
  data:
    | {
        user: string
      }
    | "loading"
    | "error",
  refresh: () => void
]

export function useAPI(
  route: `GET /${string}`,
  params?: any
): [data: unknown | "loading" | "error", refresh: () => void] {
  const modal$ = useLoadingModalRef()

  const [, pathTemplate] = route.split(" ") as ["GET", `/${string}`]
  const path = pathTemplate.replace(
    /:([0-9A-Za-z_-]+)/g,
    (_, key): string => params?.[key as keyof typeof params] ?? ""
  )

  const {
    data,
    error: panic,
    mutate,
  } = useSWR(params === null ? null : "http://localhost:5000" + path, (url) =>
    fetchWrapper(modal$)(url).then<
      [ok: boolean, status: number, json: unknown]
    >(async (r) => [r.ok, r.status, await r.json()])
  )
  if (panic) {
    throw panic
  }

  const refresh = () => {
    mutate()
  }

  if (data === undefined) {
    return ["loading", refresh]
  }

  const [ok, , json] = data
  if (!ok) {
    return ["error", refresh]
  }

  return [json, refresh]
}

function fetchWrapper(
  modal$: ReturnType<typeof useLoadingModalRef>
): typeof fetch {
  return async (...args) => {
    modal$.current?.start()

    const res = await fetch(...args).finally(() => {
      modal$.current?.finish()
    })

    return res
  }
}

// const badFetchWrapper: typeof fetch = async (...args) => {
//   changeLoadingCount(+1)

//   const res = await fetch(...args).finally(() => {
//     changeLoadingCount(-1)
//   })

//   return res
// }
