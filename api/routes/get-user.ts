import { db } from "../db"
import { defineRoute } from "../defineRoute"

export default defineRoute("GET /users/:id", (req, res) => {
  console.log(`~> Hello, ${req.params.id}`)

  const user = db.data.users.find((u) => u.id === req.params.id)
  if (!user) {
    res.statusCode = 404
    res.end(
      JSON.stringify({
        error: "User Not Found",
      })
    )
    return
  }

  res.end(JSON.stringify(user))
})
