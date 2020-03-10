const db = require('../db')

function addStudentToClass(req, res) {
    db.query(`INSERT INTO spots (class_id, student_id) VALUES (${req.body.classId}, ${req.body.studentId})`)
        .then(response => {
            res.send({ response, success: true })
        })
        .catch(error => {
            res.send({ error })
        })
}

function getByClassId(req, res) {
    db.query(`SELECT * FROM spots WHERE class_id = ${req.params.id}`)
        .then(response => {
            res.send({ data: response.rows })
        })
        .catch(error => {
            res.send({ error })
        })
}

function getByStudentId(req, res) {
    db.query(`SELECT * FROM spots WHERE student_id = ${req.params.id}`)
        .then(response => {
            res.send({ data: response.rows })
        })
        .catch(error => {
            res.send({ error })
        })
}

function removeClass(req, res) {
    db.query(`DELETE spots WHERE class_id = ${req.params.classId}`)
        .then(response => {
            res.send({ response, success: true })
        })
        .catch(error => {
            res.send({ error })
        })
}

function removeStudentFromAll(req, res) {
    db.query(`DELETE spots WHERE student_id = ${req.params.studentId}`)
        .then(response => {
            res.send({ response, success: true })
        })
        .catch(error => {
            res.send({ error })
        })
}

function removeStudentFromClass(req, res) {
    db.query(`DELETE spots WHERE class_id = ${req.params.classId} AND student_id = ${req.params.studentId}`)
        .then(response => {
            res.send({ response, success: true })
        })
        .catch(error => {
            res.send({ error })
        })
}

module.exports = {
    addStudentToClass,
    getByClassId,
    getByStudentId,
    removeClass,
    removeStudentFromAll,
    removeStudentFromClass
}