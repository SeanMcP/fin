const express = require('express')
const db = require('./db')
const app = express()
const port = 3001

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/users', (req, res) => {
    db.query('SELECT * from users')
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
    db.query('INSERT INTO users (name) VALUES (\'Test\')')
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