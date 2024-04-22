import pkg from 'pg'
const { Pool } = pkg
import dotenv from 'dotenv'

dotenv.config()

export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: 'express-docker-crud' // create the database before manually
})