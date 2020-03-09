const crypto = require('crypto')
const db = require('../db')

function register(req, res) {
    const salt = crypto.randomBytes(128).toString('base64')
    /** pbkdf2Sync params: password, salt, iterations, key length, digest */
    const hash = crypto.pbkdf2Sync(req.body.password, salt, 100000, 64, 'sha512').toString('hex')

    db.query(`INSERT INTO users (email, password, nonce) VALUES ('${req.body.email}', '${hash}', '${salt}')`)
        .then(response => {
            res.send({ response })
        })
        .catch(error => {
            res.send({ error })
        })
}

module.exports = {
    register,
}