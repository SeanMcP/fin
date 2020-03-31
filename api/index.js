const express = require('express')
const bodyParser = require('body-parser')
// const jwtMiddleware = require('express-jwt')
const cors = require('cors')

const loggingMiddleware = require('./logging/middleware')

const auth = require('./routes/auth')
const classes = require('./routes/classes')
const seats = require('./routes/seats')
const students = require('./routes/students')
const users = require('./routes/users')

const db = require('./db')

const app = express()
const port = 3001

app.use(bodyParser.json())

app.use(loggingMiddleware.console)
app.use(loggingMiddleware.write)

// TODO: Use environment variables
app.use(cors({
    origin: 'http://localhost:3000'
}))

// TODO: Figure out where to store secret
// app.use(jwtMiddleware({ secret: 'keep_it_secret_keep_it_safe' }).unless({ path: ['/', '/health', '/login'] }))

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/health', async (req, res) => {
    let status = 'Up'

    // Test Postgres connection
    await db.connect().catch(() => status = 'Down')

    res.send({ status })
})

app.post('/class', classes.add)
app.get('/class/:id', classes.getById)
app.post('/class/:id', classes.updateById)
app.delete('/class/:id', classes.deleteById)
app.get('/classes', classes.getAll)
app.get('/classes/:userId', classes.getAllByUserId)

app.post('/seat', seats.addStudentToClass)
app.get('/seats/class/:id', seats.getByClassId)
app.get('/seats/student/:id', seats.getByStudentId)
app.delete('/seats/class/:classId', seats.removeClass)
app.delete('/seats/student/:studentId', seats.removeStudentFromAll)
app.delete('/seats/student/:studentId/class/:classId', seats.removeStudentFromClass)

app.post('/student', students.add)
app.get('/student/:id', students.getById)
app.post('/student/:id', students.updateById)
app.delete('/student/:id', students.deleteById)
app.get('/students', students.getAll)
app.get('/students/:userId', students.getAllByUserId)

app.get('/users', users.getAll)
app.delete('/user/:id', users.deleteById)
app.post('/user/:id', users.updateById)

app.post('/login', auth.login)
app.post('/refresh', auth.refresh)
app.post('/register', auth.register)

app.listen(port, () => console.log(`API listening on port ${port}!`))
