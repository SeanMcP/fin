const jwt = require('jsonwebtoken')
const { createToken, jwtSecret, tokenOptions } = require('../token')

/**
 * Refresh the req token
 * This MUST be applied AFTER middlewares `jwt` AND `unauthorizedError`
 * */
module.exports = function refreshToken(req, res, next) {
  const payload = jwt.verify(req.cookies.token, jwtSecret)
  res.cookie('token', createToken({ user: payload.user }), tokenOptions)
  next()
}
