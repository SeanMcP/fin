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
    const { email, password } = req.body

    // If email or password is not provided, send "Bad Request"
    if (!email || !password) res.status(400).send({ error: 'Email and password are required.' })

    db.query(`SELECT email, nonce, password FROM users WHERE email = '${req.body.email}'`)
        .then(response => {
            const [user] = response.rows
            if (user && getHash(password, user.nonce) === user.password) {
                const token = getToken({ email })

                res.cookie('token', token, { maxAge: jwtMaxAge })
                return res.send({ success: true })
            }
            throw 'That email and/or password does not match.'
        })
        .catch(error => {
            res.status(404).send({ error })
        })
}

function refresh(req, res) {
    // 400: Bad request; 401: Unauthorized
    const { token } = req.cookie

    if (!token) return res.status(401)

    let payload
    try {
        payload = jwt.verify(token, jwtKey)
    } catch (error) {
        return res.status(
            error instanceof jwt.JsonWebTokenError ? 401 : 400
        )
    }

    const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
    if (payload.exp - nowUnixSeconds > 30) {
        return res.status(400)
    }

    res.cookie('token', getToken({ email: payload.email }), { maxAge: jwtMaxAge })
    res.end()
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
    refresh,
    register,
}