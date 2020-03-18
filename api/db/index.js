const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    database: 'fin',
    port: 5432
})

module.exports = {
    connect: (...args) => pool.connect(...args),
    query: (...args) => pool.query(...args)
}