const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const db = require('../db')
const logger = require('../logger')
const { createToken, jwtSecret, tokenOptions } = require('../token')

const iterations = 100000
const keyLength = 64
const digest = 'sha512'
const stringType = 'hex'

function getHash(password, nonce) {
  return crypto
    .pbkdf2Sync(password, nonce, iterations, keyLength, digest)
    .toString(stringType)
}

function clear(req, res) {
  const { token } = req.cookies

  if (token) res.clearCookie('token', tokenOptions)

  res.end()
}

async function login(req, res) {
  try {
    const { email, password } = req.body

    // If email or password is not provided, send "Bad Request"
    if (!email || !password) {
      throw {
        message: 'Email and password are required.',
        status: 400,
      }
    }

    const response = await db.query(
      'SELECT email, id, nonce, password FROM users WHERE email = $1',
      [email],
    )
    const [user] = response.rows
    if (user && getHash(password, user.nonce) === user.password) {
      const userToStore = { email: user.email, id: user.id }

      res.cookie('token', createToken({ user: userToStore }), tokenOptions)
      return res.status(200).send({ success: true, user: userToStore })
    }
    throw {
      message: 'That email and/or password does not match.',
      status: 404,
    }
  } catch (error) {
    logger.error('auth > login()', error)
    return res.status(error.status || 500).send({ error })
  }
}

function refresh(req, res) {
  // 400: Bad request; 401: Unauthorized
  const {
    body,
    cookies: { token },
  } = req
  const responseBody = { authorized: false }

  if (!token) return res.status(401).send({ authorized: false })

  let payload
  try {
    payload = jwt.verify(token, jwtSecret)
  } catch (error) {
    return res
      .status(error instanceof jwt.JsonWebTokenError ? 401 : 400)
      .send(responseBody)
  }

  responseBody.authorized = true

  if (body && body.includeUser) responseBody.user = payload.user

  /** This always seems to be true and sends a 400 */
  // const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
  // if (payload.exp - nowUnixSeconds > 30) {
  //   return res.status(400).send({ authorized: false })
  // }

  res.cookie('token', createToken({ user: payload.user }), tokenOptions)
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
      res.status(500).send({ success: false, error })
    })
}

module.exports = {
  clear,
  login,
  refresh,
  register,
}
