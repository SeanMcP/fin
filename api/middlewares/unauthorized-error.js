const logger = require('../logger')

module.exports = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        logger.error(err.message)
        return res.status(401).send({ error: err.message })
    }
    next()
}
