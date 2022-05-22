import * as fs from "node:fs/promises"
import * as path from "node:path"
import * as timers from "node:timers/promises"
import * as url from "node:url"
import polka from "polka"
import { db } from "./db"
import { Route } from "./Route"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { PORT = 5000 } = process.env

const routesDir = path.resolve(__dirname, "./routes/")
const routes = await fs
  .readdir(routesDir)
  .then((files) =>
    Promise.all(
      files.map((file) =>
        import(path.resolve(routesDir, file)).then<Route>((m) => m.default)
      )
    )
  )

const server = routes
  .reduce(
    (server, { method, pattern, handler }) =>
      server.add(method, pattern, async (req, res, next) => {
        try {
          await handler(
            // @ts-expect-error polkaの型定義とランタイムが噛み合っていない様子
            req,
            res
          )
        } catch (err) {
          console.error(err)

          res.statusCode = 500
          res.end(
            JSON.stringify({
              error: "Internal Server Error",
            })
          )
        }
      }),

    polka({
      // 404 handler
      onNoMatch(req, res) {
        res.statusCode = 404
        res.end(
          JSON.stringify({
            error: "Not Found",
          })
        )
      },
    })
  )

  // CORS
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")

    // Preflight
    if (req.method === "OPTIONS") {
      res.end()
      return
    }

    next()
  })

  // Dummy delay
  .use(async (req, res, next) => {
    await timers.setTimeout(Math.sqrt(Math.random()) * 1_000)

    next()
  })

await db.read()

server.listen(PORT, (err: unknown) => {
  if (err) {
    throw err
  }

  console.log(`> Running on localhost:${PORT}`)
})
