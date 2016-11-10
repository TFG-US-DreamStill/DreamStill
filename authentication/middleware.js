function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.sendfile('views/login.html')
  }
}

module.exports = authenticationMiddleware
