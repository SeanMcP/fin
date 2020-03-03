const db = require('../db')

function addClass(req, res) {
    db.query(`INSERT INTO classes (name, user_id) VALUES ('${req.body.name}', ${req.body.user_id})`)
        .then(response => {
            console.log(response)
            res.send('Success')
        })
        .catch(error => {
            console.log(error)
            res.send('Error')
        })
}

function getAllClasses(req, res) {
    db.query('SELECT * from classes')
        .then(response => {
            console.log(response)
            res.send('Success')
        })
        .catch(error => {
            console.log(error)
            res.send('Error')
        })
}

function getClassById(req, res) {
    db.query(`SELECT * FROM classes WHERE id = ${req.params.id}`)
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
    addClass,
    getAllClasses,
    getClassById
}