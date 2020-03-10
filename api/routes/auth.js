const crypto = require('crypto')
const db = require('../db')

const iterations = 100000
const keyLength = 64
const digest = 'sha512'

function register(req, res) {
    const salt = crypto.randomBytes(128).toString('base64')
    const hash = crypto.pbkdf2Sync(req.body.password, salt, iterations, keyLength, digest).toString('hex')

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