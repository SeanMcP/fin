const cors = require('cors')

module.exports = cors({
  credentials: true,
  origin: [
    process.env.CLIENT_URL,
    process.env.EXTENSION_URL,
    process.env.NODE_ENV === 'development' ? /chrome-extension:/ : undefined,
  ],
})
