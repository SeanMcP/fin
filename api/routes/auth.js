const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const db = require('../db')
const logger = require('../logger')

const iterations = 100000
const keyLength = 64
const digest = 'sha512'
const stringType = 'hex'

function getHash(password, nonce) {
  return crypto
    .pbkdf2Sync(password, nonce, iterations, keyLength, digest)
    .toString(stringType)
}

const jwtKey = 'keep_it_secret_keep_it_safe'
const jwtExpiresInSeconds = 600 // Ten minutes in seconds
const jwtMaxAge = jwtExpiresInSeconds * 1000 // In milliseconds

function getToken(payload) {
  return jwt.sign(payload, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpiresInSeconds,
  })
}

function login(req, res) {
  let status = 200
  try {
    const { email, password } = req.body

    // If email or password is not provided, send "Bad Request"
    if (!email || !password) {
      status = 400
      throw 'Email and password are required.'
    }

    db.query('SELECT id, email, nonce, password FROM users WHERE email = $1', [
      email,
    ]).then((response) => {
      const [user] = response.rows
      if (user && getHash(password, user.nonce) === user.password) {
        const token = getToken({ email })

        // TODO: Add `secure` option when off dev (HTTPS)
        res.cookie('token', token, { httpOnly: true, maxAge: jwtMaxAge })
        return res.status(status).send({ success: true, user: { id: user.id, email: user.email } })
      }
      status = 404
      throw 'That email and/or password does not match.'
    })
  } catch (error) {
    logger.error('auth > login()', error)
    return res.status(status).send({ error })
  }
}

function refresh(req, res) {
  // 400: Bad request; 401: Unauthorized
  const { token } = req.cookies

  if (!token) return res.status(401)

  let payload
  try {
    payload = jwt.verify(token, jwtKey)
  } catch (error) {
    return res.status(error instanceof jwt.JsonWebTokenError ? 401 : 400)
  }

  const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
  if (payload.exp - nowUnixSeconds > 30) {
    return res.status(400)
  }

  res.cookie('token', getToken({ email: payload.email }), { maxAge: jwtMaxAge })
  res.status(200).send({ authorized: true })
}

function register(req, res) {
  const salt = crypto.randomBytes(128).toString('base64')
  const hash = getHash(req.body.password, salt)

  db.query('INSERT INTO users (email, password, nonce) VALUES ($1, $2, $3)', [
    req.body.email,
    hash,
    salt,
  ])
    .then(() => {
      res.send({ success: true })
    })
    .catch((error) => {
      logger.error('auth > register()', error)
      res.send({ success: false, error })
    })
}

module.exports = {
  login,
  refresh,
  register,
}
