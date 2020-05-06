const db = require('../db')
const logger = require('../logger')

function add(req, res) {
  db.query(
    'INSERT INTO students (name, user_id) VALUES ($1, $2) RETURNING id',
    [req.body.name, req.body.userId],
  )
    .then((response) => {
      res.send({ student: response.rows[0], success: true })
    })
    .catch((error) => {
      logger.error('students > add()', error)
      res.status(500).send({ error })
    })
}

function addInClass(req, res) {
  db.query(
    `WITH insert_student AS (
      INSERT INTO students (name, user_id)
      VALUES ($1, $2)
      RETURNING id AS student_id
    )
    INSERT INTO seats (class_id, student_id)
    VALUES ($3, (SELECT student_id FROM insert_student))
    RETURNING (SELECT student_id FROM insert_student) AS id
    `,
    [req.body.name, req.body.userId, req.body.classId],
  )
    .then((response) => {
      res.send({ student: response.rows[0], success: true })
    })
    .catch((error) => {
      logger.error('students > addInClass()', error)
      res.status(500).send({ error })
    })
}

function getAll(req, res) {
  db.query('SELECT * FROM students')
    .then((response) => {
      res.send({ students: response.rows })
    })
    .catch((error) => {
      logger.error('students > getAll()', error)
      res.status(500).send({ error })
    })
}

function getAllByUserId(req, res) {
  db.query(
    `
    WITH classes_by_student_id AS (
      SELECT seats.student_id, json_agg(json_build_object('id', classes.id, 'name', classes.name)) AS classes
      FROM classes
      JOIN seats
      ON seats.class_id = classes.id
      GROUP BY
      seats.student_id
    )

    SELECT students.id, students.name, classes_by_student_id.classes
    FROM students
    LEFT JOIN classes_by_student_id
    ON classes_by_student_id.student_id = students.id
    WHERE students.user_id = $1;
  `,
    [req.params.userId],
  )
    .then((response) => {
      res.send({ students: response.rows })
    })
    .catch((error) => {
      logger.error('students > getAllByUserId()', error)
      res.status(500).send({ error })
    })
}

function getAllNotInClass(req, res) {
  db.query(
    `
  WITH classes_by_student_id AS (
    SELECT seats.student_id, array_agg(seats.class_id) AS classes
    FROM seats
    GROUP BY
    seats.student_id
  )

  SELECT students.name, students.id FROM classes_by_student_id
  LEFT JOIN students
  ON classes_by_student_id.student_id = students.id
  WHERE NOT ($1 = ANY (classes_by_student_id.classes))
  `,
    [req.params.id],
  )
    .then((response) => {
      res.send({ students: response.rows })
    })
    .catch((error) => {
      logger.error('students > getAllNotInClass()', error)
      res.status(500).send({ error })
    })
}

function getById(req, res) {
  db.query(`SELECT * FROM students WHERE id = $1`, [req.params.id])
    .then((response) => {
      res.send({ student: response.rows })
    })
    .catch((error) => {
      logger.error('students > getById()', error)
      res.status(500).send({ error })
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
      res.status(500).send({ error })
    })
}

function deleteById(req, res) {
  db.query('DELETE FROM students WHERE id = $1', [req.params.id])
    .then(() => {
      res.send({ success: true })
    })
    .catch((error) => {
      logger.error('students > deleteById()', error)
      res.status(500).send({ error })
    })
}

module.exports = {
  add,
  addInClass,
  deleteById,
  getAll,
  getAllByUserId,
  getAllNotInClass,
  getById,
  updateById,
}
