import polka from "polka"

const { PORT = 5000 } = process.env

polka()
  .use(one, two)
  .get("/users/:id", (req, res) => {
    console.log(`~> Hello, ${req.hello}`)
    res.end(`User: ${req.params.id}`)
  })
  .listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Running on localhost:${PORT}`)
  })

function one(req, res, next) {
  req.hello = "world"
  next()
}

function two(req, res, next) {
  req.foo = "...needs better demo 😔"
  next()
}
