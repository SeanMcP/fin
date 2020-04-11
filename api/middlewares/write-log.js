const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

module.exports = morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, '../access.log'), {
        flags: 'a',
    }),
})
