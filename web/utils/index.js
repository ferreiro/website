
/**
 * Validate if the application is in beta
 * and the user has the access token to
 * view the beta version.
 *
 * If not authorized session, then display coming soon
 */
module.exports.setupBetaFirewall = function setupBetaFirewall (req, res, next) {
  if (process.env.BETA_ACTIVATED && process.env.NODE_ENV === 'production') {
    // Validate the query tokens
    const betaSecretToken = process.env.BETA_TOKEN
    if (req.query && req.query.beta && req.query.token === betaSecretToken) {
      res.locals.beta = true
      res.locals.betaToken = req.query.token
      return next()
    }

    return res.render('comingSoon')
  }

  return next()
}