import polka from "polka"
import getUser from "./routes/get-user.js"

const { PORT = 5000 } = process.env

polka()
  .use(one, two)
  .add(getUser.method, getUser.pattern, getUser.handler)
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
