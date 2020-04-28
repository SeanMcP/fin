const jwt = require('express-jwt')

module.exports = jwt({
  getToken: (req) => req.cookies && req.cookies.token,
  // TODO: Figure out where to store secret
  secret: 'keep_it_secret_keep_it_safe',
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
