import polka from "polka"

export interface Route {
  method: HTTPMethod
  pattern: string | RegExp
  handler: polka.Middleware
}

type HTTPMethod = "OPTIONS" | "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
