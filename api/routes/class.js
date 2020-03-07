const db = require('../db')

function addClass(req, res) {
    db.query(`INSERT INTO classes (name, user_id) VALUES ('${req.body.name}', ${req.body.user_id})`)
        .then(response => {
            console.log(response)
            res.send({ success: true })
        })
        .catch(error => {
            console.log(error)
            res.send('Error')
        })
}

function getAllClasses(req, res) {
    db.query('SELECT * FROM classes')
        .then(response => {
            console.log(response)
            res.status(200).send({ data: response.rows })
        })
        .catch(error => {
            res.status(404).send({ error, title: 'Unable to retrieve data' })
        })
}

function getAllClassesByUserId(req, res) {
    db.query(`SELECT * FROM classes WHERE user_id = ${req.params.userId}`)
        .then(response => {
            res.send({data: response.rows})
        })
        .catch(error => {
            res.send({ error })
        })
}

function getClassById(req, res) {
    db.query(`SELECT * FROM classes WHERE id = ${req.params.id}`)
        .then(response => {
            res.send({ data: response.rows })
        })
        .catch(error => {
            console.log(error)
            res.send('Error')
        })
}

function updateClassById(req, res) {
    db.query(`UPDATE classes SET name = '${req.body.name}' WHERE id = ${req.params.id}`)
        .then(response => {
            console.log(response)
            res.send({ success: true })
        })
        .catch(error => {
            console.log(error)
            res.send('Error')
        })
}

function deleteClassById(req, res) {
    db.query(`DELETE classes WHERE id = ${req.params.id}`)
        .then(response => {
            console.log(response)
            res.send({ success: true })
        })
        .catch(error => {
            console.log(error)
            res.send('Error')
        })
}

module.exports = {
    addClass,
    deleteClassById,
    getAllClasses,
    getAllClassesByUserId,
    getClassById,
    updateClassById,
}