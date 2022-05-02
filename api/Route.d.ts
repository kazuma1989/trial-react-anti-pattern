import * as http from "node:http"

export interface Route {
  method: HTTPMethod
  pattern: string | RegExp
  handler: Handler
}

type HTTPMethod = "OPTIONS" | "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

interface Handler {
  (req: Request, res: Response): void
}

interface Request extends http.IncomingMessage {
  path: string
  params: { [key: string]: string }
  search: string | null
  query: { [key: string]: string | string[] }
}

interface Response extends http.ServerResponse {}
