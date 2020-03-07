const express = require('express')
const bodyParser = require('body-parser')
const classRoutes = require('./routes/class')
const userRoutes = require('./routes/user')
const app = express()
const port = 3001

app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/class', classRoutes.addClass)
app.get('/class/:id', classRoutes.getClassById)
app.post('/class/:id', classRoutes.updateClassById)
app.delete('/class/:id', classRoutes.deleteClassById)
app.get('/classes', classRoutes.getAllClasses)
app.get('/classes/:userId', classRoutes.getAllClassesByUserId)

app.get('/users', userRoutes.getAllUsers)
app.post('/user', userRoutes.addUser)
app.post('/user/:id', userRoutes.updateUserById)

app.listen(port, () => console.log(`API listening on port ${port}!`))
