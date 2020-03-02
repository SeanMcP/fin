const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    database: 'fin',
    port: 5432
})

module.exports = {
    query: (...args) => pool.query(...args)
}