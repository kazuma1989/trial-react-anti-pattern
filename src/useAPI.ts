import useSWR from "swr"
import { useLoadingModalRef } from "./GoodGlobalLoadingModal"

export function useAPI(
  route: "GET /users/:id",
  params: {
    id: string
  } | null
):
  | {
      user: string
    }
  | "loading"
  | "error"

export function useAPI(
  route: `GET /${string}`,
  params?: any
): unknown | "loading" | "error" {
  const modal$ = useLoadingModalRef()

  const [, pathTemplate] = route.split(" ") as ["GET", `/${string}`]
  const path = pathTemplate.replace(
    /:([0-9A-Za-z_-]+)/g,
    (_, key): string => params?.[key as keyof typeof params] ?? ""
  )

  const { data, error: panic } = useSWR(
    params === null ? null : "http://localhost:5000" + path,
    (url) =>
      fetchWrapper(modal$)(url).then<
        [ok: boolean, status: number, json: unknown]
      >(async (r) => [r.ok, r.status, await r.json()])
  )
  if (panic) {
    throw panic
  }

  if (data === undefined) {
    return "loading"
  }

  const [ok, status, json] = data
  if (!ok) {
    return "error"
  }

  return json
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
