const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const db = require('../db')

const iterations = 100000
const keyLength = 64
const digest = 'sha512'
const stringType = 'hex'

function getHash(password, nonce) {
    return crypto.pbkdf2Sync(password, nonce, iterations, keyLength, digest).toString(stringType)
}

const jwtKey = 'keep_it_secret_keep_it_safe'
const jwtExpiresInSeconds = 600 // Ten minutes in seconds
const jwtMaxAge = jwtExpiresInSeconds * 1000 // In milliseconds

function getToken(payload) {
    return jwt.sign(payload, jwtKey, { algorithm: 'HS256', expiresIn: jwtExpiresInSeconds })
}

function login(req, res) {
    db.query(`SELECT email, nonce, password FROM users WHERE email = '${req.body.email}'`)
        .then(response => {
            const [user] = response.rows
            if (user && getHash(req.body.password, user.nonce) === user.password) {
                const token = getToken({ email: req.body.email })

                res.cookie('token', token, { maxAge: jwtMaxAge })
                return res.send({ success: true })
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