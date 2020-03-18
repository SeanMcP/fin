const db = require('../db')

function addStudentToClass(req, res) {
    db.query(`INSERT INTO seats (class_id, student_id) VALUES (${req.body.classId}, ${req.body.studentId})`)
        .then(response => {
            res.send({ response, success: true })
        })
        .catch(error => {
            res.send({ error })
        })
}

function getByClassId(req, res) {
    db.query(`
        SELECT name, student_id, user_id
        FROM seats
        FULL JOIN students
        ON seats.student_id = students.id
        WHERE class_id = ${req.params.id}
    `)
        .then(response => {
            res.send({ data: response.rows })
        })
        .catch(error => {
            res.send({ error })
        })
}

function getByStudentId(req, res) {
    db.query(`
        SELECT class_id, name, user_id
        FROM seats
        FULL JOIN classes
        ON seats.class_id = classes.id
        WHERE student_id = ${req.params.id}
    `)
        .then(response => {
            res.send({ data: response.rows })
        })
        .catch(error => {
            res.send({ error })
        })
}

function removeClass(req, res) {
    db.query(`DELETE seats WHERE class_id = ${req.params.classId}`)
        .then(response => {
            res.send({ response, success: true })
        })
        .catch(error => {
            res.send({ error })
        })
}

function removeStudentFromAll(req, res) {
    db.query(`DELETE seats WHERE student_id = ${req.params.studentId}`)
        .then(response => {
            res.send({ response, success: true })
        })
        .catch(error => {
            res.send({ error })
        })
}

function removeStudentFromClass(req, res) {
    db.query(`DELETE seats WHERE class_id = ${req.params.classId} AND student_id = ${req.params.studentId}`)
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