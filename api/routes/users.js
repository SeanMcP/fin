const db = require('../db')

function add(req, res) {
    db.query(`INSERT INTO users (name) VALUES (${req.body.name})`)
        .then(response => {
            res.send({ data: response.rows })
        })
        .catch(error => {
            res.send({ error })
        })
}

function getAll(req, res) {
    db.query('SELECT * FROM users')
        .then(response => {
            res.send({ data: response.rows })
        })
        .catch(error => {
            res.send({ error })
        })
}

function updateById(req, res) {
    db.query(`UPDATE users SET name = '${req.body.name}' WHERE id = ${req.params.id}`)
        .then(response => {
            res.send({ data: response })
        })
        .catch(error => {
            res.send({ error })
        })
}

module.exports = {
    add,
    getAll,
    updateById
}