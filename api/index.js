const express = require('express')
const bodyParser = require('body-parser')

const classes = require('./routes/classes')
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

app.post('/student', students.add)
app.get('/student/:id', students.getById)
app.post('/student/:id', students.updateById)
app.delete('/student/:id', students.deleteById)
app.get('/students', students.getAll)
app.get('/students/:userId', students.getAllByUserId)

app.get('/users', users.getAll)
app.post('/user', users.add)
app.post('/user/:id', users.updateById)

app.listen(port, () => console.log(`API listening on port ${port}!`))
