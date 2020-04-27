const db = require('../db')
const logger = require('../logger')

function add(req, res) {
  db.query('INSERT INTO classes (name, user_id) VALUES ($1, $2)', [
    req.body.name,
    req.body.userId,
  ])
    .then(() => {
      res.send({ success: true })
    })
    .catch((error) => {
      logger.error('classes > add', error)
      res.status(500).send({ error, success: false })
    })
}

function getAll(req, res) {
  db.query('SELECT * FROM classes')
    .then((response) => {
      res.status(200).send({ classes: response.rows })
    })
    .catch((error) => {
      logger.error('classes > getAll', error)
      res.status(404).send({ error, title: 'Unable to retrieve data' })
    })
}

function getAllByUserId(req, res) {
  db.query('SELECT * FROM classes WHERE user_id = $1', [req.params.userId])
    .then((response) => {
      res.send({ classes: response.rows })
    })
    .catch((error) => {
      logger.error('classes > getAllByUserId', error)
      res.status(500).send({ error })
    })
}

function getById(req, res) {
  db.query('SELECT * FROM classes WHERE id = $1', [req.params.id])
    .then((response) => {
      res.send({ class: response.rows })
    })
    .catch((error) => {
      logger.error('classes > getById', error)
      res.status(500).send({ error })
    })
}

function updateById(req, res) {
  db.query('UPDATE classes SET name = $1 WHERE id = $2', [
    req.body.name,
    req.params.id,
  ])
    .then(() => {
      res.send({ success: true })
    })
    .catch((error) => {
      logger.error('classes > updateById', error)
      res.status(500).send({ error, success: false })
    })
}

function deleteById(req, res) {
  db.query('DELETE classes WHERE id = $1', [req.params.id])
    .then(() => {
      res.send({ success: true })
    })
    .catch((error) => {
      logger.error('classes > deleteById', error)
      res.status(500).send({ error, success: false })
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
