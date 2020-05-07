const db = require('../db')
const logger = require('../logger')

function addStudentToSection(req, res) {
  db.query('INSERT INTO seats (section_id, student_id) VALUES ($1, $2)', [
    req.body.sectionId,
    req.body.studentId,
  ])
    .then((response) => {
      res.send({ response, success: true })
    })
    .catch((error) => {
      res.status(500).send({ error })
    })
}

function getBySectionId(req, res) {
  db.query(
    `
        SELECT name, student_id AS id
        FROM seats
        JOIN students
        ON seats.student_id = students.id
        WHERE section_id = $1
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
        SELECT section_id, name, user_id
        FROM seats
        JOIN sections
        ON seats.section_id = sections.id
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

function removeSection(req, res) {
  db.query('DELETE FROM seats WHERE section_id = $1', [req.params.sectionId])
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

function removeStudentFromSection(req, res) {
  db.query('DELETE FROM seats WHERE section_id = $1 AND student_id = $2', [
    req.params.sectionId,
    req.params.studentId,
  ])
    .then(() => {
      res.send({ success: true })
    })
    .catch((error) => {
      logger.error('seats > removeStudentFromSection()', error)
      res.status(500).send({ error })
    })
}

module.exports = {
  addStudentToSection,
  getBySectionId,
  getByStudentId,
  removeSection,
  removeStudentFromAll,
  removeStudentFromSection,
}
