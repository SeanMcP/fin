const express = require('express')
const app = express()
const { Pool } = require('pg')
const port = 3001

const pool = new Pool({
    host: 'localhost',
    database: 'fin',
    port: 5432
})

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/users', (req, res) => {
    pool.query('SELECT * from users')
        .then(response => {
            console.log(response)
            res.send('Success')
        })
        .catch(error => {
            console.log(error)
            res.send('Error')
        })
})

app.post('/user', (req, res) => {
    pool.query('INSERT INTO users (name) VALUES (\'Test\')')
        .then(response => {
            console.log(response)
            res.send('Success')
        })
        .catch(err => {
            console.log(err)
            res.send('Error')
        })
})

app.listen(port, () => console.log(`API listening on port ${port}!`))