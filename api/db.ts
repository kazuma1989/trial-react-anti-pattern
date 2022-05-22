import { JSONFile, Low } from "lowdb"
import * as path from "node:path"
import * as url from "node:url"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const lowdb = new Low(
  new JSONFile<typeof import("./data.json")>(
    path.resolve(__dirname, "./data.json")
  )
)

export const db = {
  get data() {
    if (!lowdb.data) {
      throw new Error("まず db.read() を呼んで初期化してください")
    }

    return lowdb.data
  },

  read() {
    return lowdb.read()
  },

  write() {
    return lowdb.write()
  },
}
