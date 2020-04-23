const db = require('../db')
const logger = require('../logger')

function addStudentToClass(req, res) {
  db.query('INSERT INTO seats (class_id, student_id) VALUES ($1, $2)', [
    req.body.classId,
    req.body.studentId,
  ])
    .then((response) => {
      res.send({ response, success: true })
    })
    .catch((error) => {
      res.status(500).send({ error })
    })
}

function getByClassId(req, res) {
  db.query(
    `
        SELECT name, student_id AS id
        FROM seats
        JOIN students
        ON seats.student_id = students.id
        WHERE class_id = $1
    `,
    [req.params.id],
  )
    .then((response) => {
      res.send({ students: response.rows })
    })
    .catch((error) => {
      res.status(500).send({ error })
    })
}

function getByStudentId(req, res) {
  db.query(
    `
        SELECT class_id, name, user_id
        FROM seats
        JOIN classes
        ON seats.class_id = classes.id
        WHERE student_id = $1
    `,
    [req.params.id],
  )
    .then((response) => {
      res.send({ data: response.rows })
    })
    .catch((error) => {
      res.status(500).send({ error })
    })
}

function removeClass(req, res) {
  db.query('DELETE FROM seats WHERE class_id = $1', [req.params.classId])
    .then((response) => {
      res.send({ response, success: true })
    })
    .catch((error) => {
      res.status(500).send({ error })
    })
}

function removeStudentFromAll(req, res) {
  db.query('DELETE FROM seats WHERE student_id = $1', [req.params.studentId])
    .then((response) => {
      res.send({ response, success: true })
    })
    .catch((error) => {
      res.status(500).send({ error })
    })
}

function removeStudentFromClass(req, res) {
  db.query('DELETE FROM seats WHERE class_id = $1 AND student_id = $2', [
    req.params.classId,
    req.params.studentId,
  ])
    .then(() => {
      res.send({ success: true })
    })
    .catch((error) => {
      logger.error('seats > removeStudentFromClass()', error)
      res.status(500).send({ error })
    })
}

module.exports = {
  addStudentToClass,
  getByClassId,
  getByStudentId,
  removeClass,
  removeStudentFromAll,
  removeStudentFromClass,
}
