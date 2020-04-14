const jwt = require('express-jwt')

module.exports = jwt({
    getToken: (req) => req.cookies && req.cookies.token,
    // TODO: Figure out where to store secret
    secret: 'keep_it_secret_keep_it_safe'
})
    .unless({ path: ['/', '/clear', '/health', '/login', '/refresh'] })
