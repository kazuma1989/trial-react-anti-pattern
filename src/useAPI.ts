import useSWR from "swr"
import { useLoadingModal } from "./GoodGlobalLoadingModal"

export function useAPI(
  route: "GET /users/:id",
  params: {
    id: string
  } | null
): [
  response:
    | OKResponse<{
        user: string
      }>
    | LoadingResponse
    | ErrorResponse,
  refresh: () => void
]

export function useAPI(
  route: `GET /${string}`,
  params?: any
): [
  response: OKResponse<unknown> | LoadingResponse | ErrorResponse,
  refresh: () => void
] {
  const modal = useLoadingModal()

  const [, pathTemplate] = route.split(" ") as ["GET", `/${string}`]
  // "/foo/:id/bar" + { id: "xxx" } -> "/foo/xxx/bar"
  const path = pathTemplate.replace(
    /:([0-9A-Za-z_-]+)/g,
    (_, key): string => params?.[key as keyof typeof params] ?? ""
  )

  const {
    data,
    error: panic,
    mutate,
  } = useSWR(params === null ? null : "http://localhost:5000" + path, (url) =>
    fetchWrapper(modal)(url).then<[ok: boolean, status: number, json: unknown]>(
      async (r) => [r.ok, r.status, await r.json()]
    )
  )
  if (panic) {
    throw panic
  }

  const refresh = () => {
    mutate()
  }

  if (data === undefined) {
    return [
      {
        status: "loading",
        data: null,
      },
      refresh,
    ]
  }

  const [ok, , json] = data
  if (!ok) {
    return [
      {
        status: "error",
        data: isErrorResponseData(json) ? json : { error: "Unknown Error" },
      },
      refresh,
    ]
  }

  return [
    {
      status: "ok",
      data: json,
    },
    refresh,
  ]
}

function fetchWrapper(modal: ReturnType<typeof useLoadingModal>): typeof fetch {
  return async (...args) => {
    modal.start()

    const res = await fetch(...args).finally(() => {
      modal.finish()
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

interface OKResponse<T> {
  status: "ok"
  data: T
}

interface LoadingResponse {
  status: "loading"
  data: null
}

interface ErrorResponse {
  status: "error"
  data: {
    error: string
  }
}

function isErrorResponseData(data: unknown): data is ErrorResponse["data"] {
  if (!data || typeof data !== "object") {
    return false
  }

  return "error" in data && typeof (data as any).error === "string"
}
