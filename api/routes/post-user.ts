import { db } from "../db"
import { defineRoute } from "../defineRoute"

export default defineRoute("POST /users", async (req, res) => {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }

  let body: {
    user: string
  }
  try {
    body = JSON.parse(Buffer.concat(chunks).toString("utf-8"))
  } catch (err) {
    console.error(err)

    res.statusCode = 400
    res.end(
      JSON.stringify({
        error: "Malformed JSON Format",
      })
    )
    return
  }

  if (typeof body.user !== "string" || !body.user) {
    res.statusCode = 400
    res.end(
      JSON.stringify({
        error: "Bad Request Body",
      })
    )
    return
  }

  const newUser = {
    id: Math.random().toString(),
    user: body.user,
  }

  db.data.users.push(newUser)

  await db.write()

  res.end(JSON.stringify(newUser))
})
