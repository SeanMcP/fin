const jwt = require('jsonwebtoken')

const jwtSecret = 'keep_it_secret_keep_it_safe'
const jwtExpiresInSeconds = 600 // Ten minutes in seconds
const jwtMaxAge = jwtExpiresInSeconds * 1000 // In milliseconds

function createToken(payload) {
  if (!payload.hasOwnProperty('user'))
    throw new Error('Token body must include user')
  return jwt.sign(payload, jwtSecret, {
    algorithm: 'HS256',
    expiresIn: jwtExpiresInSeconds,
  })
}

// TODO: Add `secure` option when off dev (HTTPS)
const tokenOptions = {
  httpOnly: true,
  maxAge: jwtMaxAge,
}

module.exports = {
  createToken,
  jwtSecret,
  tokenOptions,
}
