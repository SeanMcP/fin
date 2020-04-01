const db = require('../db')

function add(req, res) {
  db.query('INSERT INTO students (name, user_id) VALUES ($1, $2)', [
    req.body.name,
    req.body.userId,
  ])
    .then((response) => {
      console.log(response)
      res.send({ success: true })
    })
    .catch((error) => {
      console.log(error)
      res.send('Error')
    })
}

function getAll(req, res) {
  db.query('SELECT * FROM students')
    .then((response) => {
      console.log(response)
      res.status(200).send({ data: response.rows })
    })
    .catch((error) => {
      res.status(404).send({ error, title: 'Unable to retrieve data' })
    })
}

function getAllByUserId(req, res) {
  db.query('SELECT * FROM students WHERE user_id = $1', [req.params.userId])
    .then((response) => {
      res.send({ data: response.rows })
    })
    .catch((error) => {
      res.send({ error })
    })
}

function getById(req, res) {
  db.query(`SELECT * FROM students WHERE id = $1`, [req.params.id])
    .then((response) => {
      res.send({ data: response.rows })
    })
    .catch((error) => {
      console.log(error)
      res.send('Error')
    })
}

function updateById(req, res) {
  db.query('UPDATE students SET name = $1 WHERE id = $2', [
    req.body.name,
    req.params.id,
  ])
    .then((response) => {
      console.log(response)
      res.send({ success: true })
    })
    .catch((error) => {
      console.log(error)
      res.send('Error')
    })
}

function deleteById(req, res) {
  db.query('DELETE students WHERE id = $1', [req.params.id])
    .then((response) => {
      console.log(response)
      res.send({ success: true })
    })
    .catch((error) => {
      console.log(error)
      res.send('Error')
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
