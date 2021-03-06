const db = require('../db')
const logger = require('../logger')

function deleteById(req, res) {
  db.query('DELETE FROM users WHERE id = $1', [req.params.id])
    .then((response) => {
      res.send({ response, success: true })
    })
    .catch((error) => {
      res.status(500).send({ error })
    })
}

function getAll(req, res) {
  db.query('SELECT * FROM users')
    .then((response) => {
      res.send({ data: response.rows })
    })
    .catch((error) => {
      logger.error('users > getAll()', error)
      res.status(500).send({ error })
    })
}

function updateById(req, res) {
  db.query('UPDATE users SET name = $1 WHERE id = $2', [
    req.body.name,
    req.params.id,
  ])
    .then((response) => {
      res.send({ data: response })
    })
    .catch((error) => {
      logger.error('users > updateById()', error)
      res.status(500).send({ error })
    })
}

module.exports = {
  deleteById,
  getAll,
  updateById,
}
