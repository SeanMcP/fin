const db = require('../db')
const logger = require('../logging/logger')

function add(req, res) {
  db.query('INSERT INTO students (name, user_id) VALUES ($1, $2)', [
    req.body.name,
    req.body.userId,
  ])
    .then(() => {
      res.send({ success: true })
    })
    .catch((error) => {
      logger.error('students > add()', error)
      res.send({ error })
    })
}

function getAll(req, res) {
  db.query('SELECT * FROM students')
    .then((response) => {
      res.send({ students: response.rows })
    })
    .catch((error) => {
      logger.error('students > getAll()', error)
      res.send({ error })
    })
}

function getAllByUserId(req, res) {
  db.query('SELECT * FROM students WHERE user_id = $1', [req.params.userId])
    .then((response) => {
      res.send({ students: response.rows })
    })
    .catch((error) => {
      logger.error('students > getAllByUserId()', error)
      res.send({ error })
    })
}

function getById(req, res) {
  db.query(`SELECT * FROM students WHERE id = $1`, [req.params.id])
    .then((response) => {
      res.send({ student: response.rows })
    })
    .catch((error) => {
      logger.error('students > getById()', error)
      res.send({ error })
    })
}

function updateById(req, res) {
  db.query('UPDATE students SET name = $1 WHERE id = $2', [
    req.body.name,
    req.params.id,
  ])
    .then(() => {
      res.send({ success: true })
    })
    .catch((error) => {
      logger.error('students > updateById()', error)
      res.send({ error })
    })
}

function deleteById(req, res) {
  db.query('DELETE students WHERE id = $1', [req.params.id])
    .then(() => {
      res.send({ success: true })
    })
    .catch((error) => {
      logger.error('students > deleteById()', error)
      res.send({ error })
    })
}

module.exports = {
  add,
  deleteById,
  getAll,
  getAllByUserId,
  getById,
  updateById,
}
