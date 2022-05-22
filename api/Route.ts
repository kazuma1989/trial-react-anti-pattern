import * as http from "node:http"

export interface Route<ParamKeys extends string = string> {
  method: HTTPMethod
  pattern: string | RegExp
  handler: HandlerFunc<ParamKeys>
}

type HTTPMethod = "OPTIONS" | "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

interface HandlerFunc<ParamKeys extends string> {
  (req: Request<ParamKeys>, res: Response): void | PromiseLike<void>
}

interface Request<ParamKeys extends string> extends http.IncomingMessage {
  path: string
  params: { [K in ParamKeys]: string }
  search: string | null
  query: { [key: string]: string | string[] }
}

interface Response extends http.ServerResponse {
  end(cb?: () => void): this
  end(chunk: string, cb?: () => void): this
  end(chunk: string, encoding: BufferEncoding, cb?: () => void): this
}
