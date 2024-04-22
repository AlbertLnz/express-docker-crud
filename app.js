import express from "express"
import { pool } from "./database.js"

const PORT = 3000
const app = express()

// Middlewares
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  const { name, location } = req.body

  res.status(200).send({
    message: `YOUR KEYS WERE ${name} - ${location}`
  })

})

app.get('/setup', async (req, res) => {
  try {
    await pool.query(`CREATE TABLE schools(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      address VARCHAR(255)
    )`)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})