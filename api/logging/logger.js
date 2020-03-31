function getTimestamp() {
    return new Date().toISOString()
}

module.exports = {
    error: (args) => console.error('ERROR', getTimestamp(), args),
    log: (args) => console.log('LOG', getTimestamp(), args),
    warn: (args) => console.warn('WARN', getTimestamp(), args),
}
