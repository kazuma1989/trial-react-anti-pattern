import useSWR from "swr"

export function useAPI(
  route: "GET /users/:id",
  params: {
    id: string
  }
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
  const [, pathTemplate] = route.split(" ") as ["GET", `/${string}`]

  const path = pathTemplate.replace(
    /:([0-9A-Za-z_-]+)/g,
    (_, key): string => params?.[key as keyof typeof params] ?? ""
  )

  const { data, error: panic } = useSWR("http://localhost:5000" + path, (url) =>
    fetch(url).then<[ok: boolean, status: number, json: unknown]>(async (r) => [
      r.ok,
      r.status,
      await r.json(),
    ])
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
