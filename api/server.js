import * as fs from "node:fs/promises"
import * as path from "node:path"
import * as url from "node:url"
import polka from "polka"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { PORT = 5000 } = process.env

const routesDir = path.resolve(__dirname, "./routes/")
const routes = await fs.readdir(routesDir).then((files) =>
  Promise.all(
    files.map((file) =>
      import(path.resolve(routesDir, file)).then(
        /** @returns {import("./Route").Route} */
        (m) => m.default
      )
    )
  )
)

routes
  .reduce(
    (server, { method, pattern, handler }) =>
      server.add(method, pattern, handler),
    polka()
  )

  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
  })

  .listen(PORT, (err) => {
    if (err) {
      throw err
    }

    console.log(`> Running on localhost:${PORT}`)
  })
