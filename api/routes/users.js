const db = require('../db')

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
    getAll,
    updateById
}