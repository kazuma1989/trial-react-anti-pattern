import useSWR from "swr"
import { useLoadingModal } from "./GoodGlobalLoadingModal"

export function useAPI(
  route: "GET /users/:id",
  params: {
    id: string
  } | null
):
  | OKResponse<{
      user: string
    }>
  | LoadingResponse
  | ErrorResponse

export function useAPI(
  route: "GET /always-404",
  params?: null
):
  | OKResponse<{
      nonsense: number
    }>
  | LoadingResponse
  | ErrorResponse

export function useAPI(
  route: `GET /${string}`,
  params?: any
): OKResponse<unknown> | LoadingResponse | ErrorResponse {
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
    return ["loading", null, refresh]
  }

  const [ok, , json] = data
  if (!ok) {
    return [
      "error",
      isErrorData(json) ? json : { error: "Unknown Error" },
      refresh,
    ]
  }

  return ["ok", json, refresh]
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

type OKResponse<T> = [status: "ok", data: T, refresh: () => void]

type LoadingResponse = [status: "loading", data: null, refresh: () => void]

type ErrorResponse = [status: "error", data: ErrorData, refresh: () => void]

interface ErrorData {
  error: string
}

function isErrorData(data: unknown): data is ErrorData {
  if (!data || typeof data !== "object") {
    return false
  }

  return "error" in data && typeof (data as any).error === "string"
}
