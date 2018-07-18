module.exports.isAuthenticated = function isAuthenticated (req, res, next) {
  // If not logged user, ask for login.
  if (!req.user) {
    return res.redirect('/admin/login')
  }

  // User is logged In
  return next()
}
