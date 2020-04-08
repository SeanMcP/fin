const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASS
})

module.exports = {
  connect: (...args) => pool.connect(...args),
  query: (...args) => pool.query(...args),
}
