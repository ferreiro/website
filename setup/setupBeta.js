/**
 * Validate if the application is in beta
 * and the user has the access token to
 * view the beta version.
 *
 * If not authorized session, then display coming soon
 */
const env = require('../env')

module.exports = (app) => {
  // This is only valid for Heroku.
  // Change this if you're using other
  // hosting provider.
  if (process.env.BETA_ACTIVATED && process.env.NODE_ENV === 'production') {
    app.use(setupBetaFirewall)
  }
}

function setupBetaFirewall (req, res, next) {
  const betaSecretToken = process.env.BETA_TOKEN

  // First check if exist a cookie and has a valid beta token
  if (req.cookies && req.cookies['betaToken'] && req.cookies['betaToken'] === betaSecretToken) {
    return next() // success!
  }

  // Otherwise check the url params and validate token
  if (req.query && req.query.beta && req.query.token === betaSecretToken) {
    // Set the beta cookie
    res.cookie('betaToken', process.env.BETA_TOKEN, {
      maxAge: 7 * (24 * 3600000),
      httpOnly: true
    })
    return next()
  }

  return res.render('comingSoon')
}