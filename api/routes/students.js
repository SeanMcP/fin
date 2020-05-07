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

function addInSection(req, res) {
  db.query(
    `WITH insert_student AS (
      INSERT INTO students (name, user_id)
      VALUES ($1, $2)
      RETURNING id AS student_id
    )
    INSERT INTO seats (section_id, student_id)
    VALUES ($3, (SELECT student_id FROM insert_student))
    RETURNING (SELECT student_id FROM insert_student) AS id
    `,
    [req.body.name, req.body.userId, req.body.sectionId],
  )
    .then((response) => {
      res.send({ student: response.rows[0], success: true })
    })
    .catch((error) => {
      logger.error('students > addInSection()', error)
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
    WITH sections_by_student_id AS (
      SELECT seats.student_id, json_agg(json_build_object('id', sections.id, 'name', sections.name)) AS sections
      FROM sections
      JOIN seats
      ON seats.section_id = sections.id
      GROUP BY
      seats.student_id
    )

    SELECT students.id, students.name, sections_by_student_id.sections
    FROM students
    LEFT JOIN sections_by_student_id
    ON sections_by_student_id.student_id = students.id
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

function getAllNotInSection(req, res) {
  db.query(
    `
  WITH sections_by_student_id AS (
    SELECT seats.student_id, array_agg(seats.section_id) AS sections
    FROM seats
    GROUP BY
    seats.student_id
  )

  SELECT students.name, students.id FROM sections_by_student_id
  LEFT JOIN students
  ON sections_by_student_id.student_id = students.id
  WHERE NOT ($1 = ANY (sections_by_student_id.sections))
  `,
    [req.params.id],
  )
    .then((response) => {
      res.send({ students: response.rows })
    })
    .catch((error) => {
      logger.error('students > getAllNotInSection()', error)
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
  addInSection,
  deleteById,
  getAll,
  getAllByUserId,
  getAllNotInSection,
  getById,
  updateById,
}
