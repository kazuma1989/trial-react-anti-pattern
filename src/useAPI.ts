import useSWR from "swr"

export function useAPI(
  route: "GET /users/:id",
  params: { id: string }
): { user: string }

export function useAPI(route: `GET /${string}`, params?: any): unknown {
  const [, pathTemplate] = route.split(" ") as ["GET", `/${string}`]

  const path = pathTemplate.replace(
    /:([0-9A-Za-z_-]+)/g,
    (_, key): string => params?.[key as keyof typeof params] ?? ""
  )

  return useSWR("http://localhost:5000" + path, (url) =>
    fetch(url).then((r) => r.json())
  ).data
}
