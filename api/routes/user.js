const db = require('../db')

function addUser (req, res) {
    db.query(`INSERT INTO users (name) VALUES (${req.body.name})`)
        .then(response => {
            console.log(response)
            res.send('Success')
        })
        .catch(err => {
            console.log(err)
            res.send('Error')
        })
}

function getAllUsers (req, res) {
    db.query('SELECT * FROM users')
        .then(response => {
            console.log(response)
            res.send('Success')
        })
        .catch(error => {
            console.log(error)
            res.send('Error')
        })
}

function updateUserById(req, res) {
    db.query(`UPDATE users SET name = '${req.body.name}' WHERE id = ${req.params.id}`)
        .then(response => {
            console.log(response)
            res.send('Success')
        })
        .catch(error => {
            console.log(error)
            res.send('Error')
        })
}

module.exports = {
    addUser,
    getAllUsers,
    updateUserById
}