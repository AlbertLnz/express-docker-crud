import express from "express"
import { pool } from "./database.js"

const PORT = 3000
const app = express()

// Middlewares
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.post('/', async (req, res) => {
  const { name, location } = req.query

  try {
    await pool.query(`INSERT INTO schools(name, addres) VALUES ($1, $2)`, [ name, location ])
    res.status(200).send({
      message: 'Successfully added!'
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.get('/setup', async (_req, res) => {
  try {
    await pool.query(`CREATE TABLE schools(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      address VARCHAR(255)
    )`)
    res.status(200).send({
      message: 'Successfully created!'
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})