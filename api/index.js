const express = require('express')
const bodyParser = require('body-parser')

const auth = require('./routes/auth')
const classes = require('./routes/classes')
const spots = require('./routes/spots')
const students = require('./routes/students')
const users = require('./routes/users')

const app = express()
const port = 3001

app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/class', classes.add)
app.get('/class/:id', classes.getById)
app.post('/class/:id', classes.updateById)
app.delete('/class/:id', classes.deleteById)
app.get('/classes', classes.getAll)
app.get('/classes/:userId', classes.getAllByUserId)

app.post('/spot', spots.addStudentToClass)
app.get('/spots/class/:id', spots.getByClassId)
app.get('/spots/student/:id', spots.getByStudentId)
app.delete('/spots/class/:classId', spots.removeClass)
app.delete('/spots/student/:studentId', spots.removeStudentFromAll)
app.delete('/spots/student/:studentId/class/:classId', spots.removeStudentFromClass)

app.post('/student', students.add)
app.get('/student/:id', students.getById)
app.post('/student/:id', students.updateById)
app.delete('/student/:id', students.deleteById)
app.get('/students', students.getAll)
app.get('/students/:userId', students.getAllByUserId)

app.get('/users', users.getAll)
app.post('/user', users.add)
app.post('/user/:id', users.updateById)

app.post('/register', auth.register)

app.listen(port, () => console.log(`API listening on port ${port}!`))
