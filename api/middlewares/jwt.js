const jwt = require('express-jwt')
const { jwtSecret } = require('../token')

module.exports = jwt({
  getToken: (req) => req.cookies && req.cookies.token,
  secret: jwtSecret,
}).unless({
  // TODO: Apply this middleware to every endpoint that
  // needs it, instead of adding to this array. A long
  // list of excludes will surely be less performant.
  path: [
    '/',
    '/clear',
    '/health',
    '/login',
    '/refresh',
    '/register',
    /\/ext\//,
  ],
})
