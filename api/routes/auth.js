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

function clear(req, res) {
  const { token } = req.cookies

  if (token) res.clearCookie('token', { httpOnly: true, maxAge: jwtMaxAge })

  res.end()
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
        const userToStore = { email: user.email, id: user.id }

        // TODO: Add `secure` option when off dev (HTTPS)
        res.cookie('token', getToken({ user: userToStore }), { httpOnly: true, maxAge: jwtMaxAge })
        return res.status(status).send({ success: true, user: userToStore })
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
  const { body, cookies: { token } } = req
  const responseBody = { authorized: false }

  if (!token) return res.status(401).send({ authorized: false })

  let payload
  try {
    payload = jwt.verify(token, jwtKey)
  } catch (error) {
    return res.status(error instanceof jwt.JsonWebTokenError ? 401 : 400).send(responseBody)
  }

  responseBody.authorized = true

  if (body && body.include_user) responseBody.user = payload.user

  /** This always seems to be true and sends a 400 */
  // const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
  // if (payload.exp - nowUnixSeconds > 30) {
  //   return res.status(400).send({ authorized: false })
  // }

  res.cookie('token', getToken({ user: payload.user }), { httpOnly: true, maxAge: jwtMaxAge })
  res.status(200).send(responseBody)
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
  clear,
  login,
  refresh,
  register,
}
