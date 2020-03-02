const db = require('../db')

function addUser (req, res) {
    db.query('INSERT INTO users (name) VALUES (\'Test\')')
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
    db.query('SELECT * from users')
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
    getAllUsers
}