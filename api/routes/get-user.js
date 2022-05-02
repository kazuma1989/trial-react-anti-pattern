import { defineRoute } from "../defineRoute.js"

export default defineRoute("GET /users/:id", (req, res) => {
  console.log(`~> Hello, ${req.hello}`)

  res.end(
    JSON.stringify({
      user: req.params.id,
    })
  )
})
