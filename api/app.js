require('dotenv').config()
const express = require('express')

const auth = require('./routes/auth')
const sections = require('./routes/sections')
const seats = require('./routes/seats')
const students = require('./routes/students')
const users = require('./routes/users')

const db = require('./db')

const app = express()
const port = process.env.PORT || 3031

// MIDDLEWARES

app.use(require('body-parser').json())
app.use(require('cookie-parser')())

app.use(require('./middlewares/log-console'))
app.use(require('./middlewares/log-file'))

app.use(require('./middlewares/cors'))

app.use(require('./middlewares/jwt'))
app.use(require('./middlewares/unauthorized-error'))

const refreshToken = require('./middlewares/refresh-token')

// ROUTES

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/health', async (req, res) => {
  let status = 'Up'

  // Test Postgres connection
  await db.connect().catch(() => (status = 'Down'))

  res.send({ status })
})

app.post('/seat', seats.addStudentToSection)
app.get('/seats/section/:id', seats.getBySectionId)
app.get('/seats/student/:id', seats.getByStudentId)
app.delete('/seats/section/:sectionId', seats.removeSection)
app.delete('/seats/student/:studentId', seats.removeStudentFromAll)
app.delete(
  '/seats/student/:studentId/section/:sectionId',
  seats.removeStudentFromSection,
)

app.post('/section', sections.add)
app.get('/section/:id', sections.getById)
app.post('/section/:id', sections.updateById)
app.delete('/section/:id', sections.deleteById)
app.get('/sections', sections.getAll)
app.get('/sections/:userId', refreshToken, sections.getAllByUserId)

app.post('/student', students.add)
app.post('/student/section', students.addInSection)
app.get('/student/:id', students.getById)
app.post('/student/:id', students.updateById)
app.delete('/student/:id', students.deleteById)
app.get('/students/not/section/:id', refreshToken, students.getAllNotInSection)
app.get('/students', students.getAll)
app.get('/students/:userId', students.getAllByUserId)

app.get('/users', users.getAll)
app.delete('/user/:id', users.deleteById)
app.post('/user/:id', users.updateById)

app.get('/clear', auth.clear)
app.post('/login', auth.login)
app.post('/refresh', auth.refresh)
app.post('/register', auth.register)

// BROWSER EXTENSION ENDPOINTS
const extensionOnly = require('./middlewares/extension-only')

app.get('/ext/sections/:userId', extensionOnly, sections.getAllByUserId)
app.get('/ext/students/section/:id', extensionOnly, seats.getBySectionId)

app.listen(port, () => console.log(`API listening on port ${port}!`))
