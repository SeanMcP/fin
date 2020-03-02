const db = require('../db')

function addClass(req, res) {
    db.query(`INSERT INTO classes (name, user_id) VALUES ('${req.body.name}', ${req.body.user_id})`)
        .then(response => {
            console.log(response)
            res.send('Success')
        })
        .catch(err => {
            console.log(err)
            res.send('Error')
        })
}

module.exports = {
    addClass
}