const db = require('../db')

function deleteById(req, res) {
    db.query(`DELETE users WHERE id = ${req.params.id}`)
        .then(response => {
            res.send({ response, success: true })
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
    deleteById,
    getAll,
    updateById
}