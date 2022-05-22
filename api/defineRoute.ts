import { Route } from "./Route"

/**
 * @example
 * export default defineRoute("GET /users/:id", (req, res) => {
 *   res.statusCode = 200
 *   res.end(JSON.stringify({ thisIs: "OK" }))
 * })
 */
export function defineRoute<P extends string>(
  route: `${Route["method"]} ${P}`,
  handler: Route<ExtractColonParams<P>>["handler"]
): Route {
  const [method, pattern] = route.split(" ") as [Route["method"], string]

  return {
    method,
    pattern,
    handler,
  }
}

/**
 * @example
 * ExtractColonParams<"/foo/:bar"> == "bar"
 * ExtractColonParams<"/foo/:bar/:baz"> == "bar" | "baz"
 */
type ExtractColonParams<Path extends string> =
  Path extends `${string}:${infer AfterColon}`
    ? AfterColon extends `${infer Key}/${infer Rest}`
      ? Key | ExtractColonParams<Rest>
      : AfterColon
    : never
