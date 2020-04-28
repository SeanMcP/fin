const originBrowserMap = {
  'chrome-extension': 'chrome',
}

module.exports = function (req, res, next) {
  const { headers } = req
  const [origin] = headers.origin.split('://')
  if (originBrowserMap[origin]) {
    res.extension = originBrowserMap[origin]
    return next()
  }
  res.status(401)
}
