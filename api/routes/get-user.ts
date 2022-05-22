import { defineRoute } from "../defineRoute"

export default defineRoute("GET /users/:id", (req, res) => {
  console.log(`~> Hello, ${req.params.id}`)

  if (req.params.id.includes("404")) {
    res.statusCode = 404
    res.end(
      JSON.stringify({
        error: "User Not Found",
      })
    )
    return
  }

  res.end(
    JSON.stringify({
      user: req.params.id,
    })
  )
})
