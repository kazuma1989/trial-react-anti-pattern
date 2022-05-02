import { defineRoute } from "../defineRoute.js"

export default defineRoute({
  method: "GET",
  pattern: "/users/:id",
  handler: (req, res) => {
    console.log(`~> Hello, ${req.hello}`)

    res.end(
      JSON.stringify({
        user: req.params.id,
      })
    )
  },
})
