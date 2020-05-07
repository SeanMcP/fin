const db = require('../db')
const logger = require('../logger')

function add(req, res) {
  db.query('INSERT INTO sections (name, user_id) VALUES ($1, $2)', [
    req.body.name,
    req.body.userId,
  ])
    .then(() => {
      res.send({ success: true })
    })
    .catch((error) => {
      logger.error('sections > add', error)
      res.status(500).send({ error, success: false })
    })
}

function getAll(req, res) {
  db.query('SELECT * FROM sections')
    .then((response) => {
      res.status(200).send({ sections: response.rows })
    })
    .catch((error) => {
      logger.error('sections > getAll', error)
      res.status(404).send({ error, title: 'Unable to retrieve data' })
    })
}

function getAllByUserId(req, res) {
  db.query('SELECT * FROM sections WHERE user_id = $1', [req.params.userId])
    .then((response) => {
      res.send({ sections: response.rows })
    })
    .catch((error) => {
      logger.error('sections > getAllByUserId', error)
      res.status(500).send({ error })
    })
}

function getById(req, res) {
  db.query('SELECT * FROM sections WHERE id = $1', [req.params.id])
    .then((response) => {
      res.send({ section: response.rows })
    })
    .catch((error) => {
      logger.error('sections > getById', error)
      res.status(500).send({ error })
    })
}

function updateById(req, res) {
  db.query('UPDATE sections SET name = $1 WHERE id = $2', [
    req.body.name,
    req.params.id,
  ])
    .then(() => {
      res.send({ success: true })
    })
    .catch((error) => {
      logger.error('sections > updateById', error)
      res.status(500).send({ error, success: false })
    })
}

function deleteById(req, res) {
  db.query('DELETE FROM sections WHERE id = $1', [req.params.id])
    .then(() => {
      res.send({ success: true })
    })
    .catch((error) => {
      logger.error('sections > deleteById', error)
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
