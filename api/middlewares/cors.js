const cors = require('cors')

module.exports = cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
})
