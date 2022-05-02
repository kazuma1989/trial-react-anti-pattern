/**
 * @typedef {import("./Route").Route} Route
 * @param {`${Route["method"]} /${string}`} route
 * @param {Route["handler"]} handler
 * @returns {Route}
 * @example
 * export default defineRoute("GET /users/:id", (req, res) => {
 *    res.statusCode = 200
 *    res.end(JSON.stringify({ thisIs: "OK" }))
 * })
 */
export function defineRoute(route, handler) {
  const [method, pattern] = route.split(" ")

  return {
    method,
    pattern,
    handler,
  }
}
