const db = require('../db')

function addStudent(req, res) {
    db.query(`INSERT INTO students (name, user_id) VALUES ('${req.body.name}', ${req.body.user_id})`)
        .then(response => {
            console.log(response)
            res.send({ success: true })
        })
        .catch(error => {
            console.log(error)
            res.send('Error')
        })
}

function getAllStudents(req, res) {
    db.query('SELECT * FROM students')
        .then(response => {
            console.log(response)
            res.status(200).send({ data: response.rows })
        })
        .catch(error => {
            res.status(404).send({ error, title: 'Unable to retrieve data' })
        })
}

function getAllStudentsByUserId(req, res) {
    db.query(`SELECT * FROM students WHERE user_id = ${req.params.userId}`)
        .then(response => {
            res.send({data: response.rows})
        })
        .catch(error => {
            res.send({ error })
        })
}

function getStudentById(req, res) {
    db.query(`SELECT * FROM students WHERE id = ${req.params.id}`)
        .then(response => {
            res.send({ data: response.rows })
        })
        .catch(error => {
            console.log(error)
            res.send('Error')
        })
}

function updateStudentById(req, res) {
    db.query(`UPDATE students SET name = '${req.body.name}' WHERE id = ${req.params.id}`)
        .then(response => {
            console.log(response)
            res.send({ success: true })
        })
        .catch(error => {
            console.log(error)
            res.send('Error')
        })
}

function deleteStudentById(req, res) {
    db.query(`DELETE students WHERE id = ${req.params.id}`)
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
    addStudent,
    deleteStudentById,
    getAllStudents,
    getAllStudentsByUserId,
    getStudentById,
    updateStudentById,
}