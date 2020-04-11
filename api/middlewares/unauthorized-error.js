module.exports = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({ error: err.message })
    }
    next()
}
