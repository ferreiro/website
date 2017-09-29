const setupDatabase = require('./setupDatabase')
const setupMiddlewares = require('./setupMiddlewares')
const setupPassport = require('./setupPassport')
const setupLocals = require('./setupLocals')
const setupAdmin = require('./setupAdmin')
const handleErrors = require('./handleErrors')

module.exports = (app) => {
  setupDatabase()
  setupMiddlewares(app)
  setupPassport(app) // Important! after middlewares setup
  setupLocals(app)
  setupAdmin(app)

  // Setup routes
  app.use('/', require('../web/routes'))
  app.use('/api', require('../api'))

  // Handle Application Errors
  // This must be placed at the end of app code.
  handleErrors(app)
}