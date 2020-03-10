const crypto = require('crypto')
const db = require('../db')

const iterations = 100000
const keyLength = 64
const digest = 'sha512'
const stringType = 'hex'

function getHash(password, nonce) {
    return crypto.pbkdf2Sync(password, nonce, iterations, keyLength, digest).toString(stringType)
}

function login(req, res) {
    db.query(`SELECT email, nonce, password FROM users WHERE email = '${req.body.email}'`)
        .then(response => {
            const [user] = response.rows
            if (user) {
                if (getHash(req.body.password, user.nonce) === user.password) {
                    res.send({ success: true })
                }
            }
            throw 'That username or password does not match'
        })
        .catch(error => {
            res.send({ error })
        })
}

function register(req, res) {
    const salt = crypto.randomBytes(128).toString('base64')
    const hash = getHash(req.body.password, salt)

    db.query(`INSERT INTO users (email, password, nonce) VALUES ('${req.body.email}', '${hash}', '${salt}')`)
        .then(response => {
            res.send({ response })
        })
        .catch(error => {
            res.send({ error })
        })
}

module.exports = {
    login,
    register,
}