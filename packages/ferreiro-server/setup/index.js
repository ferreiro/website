const setupSSL = require('./setupSSL')
const setupBeta = require('./setupBeta')
const setupDatabase = require('./setupDatabase')
const setupMiddlewares = require('./setupMiddlewares')
const setupPassport = require('./setupPassport')
const setupLocals = require('./setupLocals')
const setupAdmin = require('./setupAdmin')
const handleErrors = require('./handleErrors')

module.exports = (app) => {
    setupSSL(app)
    setupDatabase()
    setupMiddlewares(app)
    setupPassport(app) // Important! after middlewares setup
    setupAdmin(app)
    setupLocals(app)

    // Setup routes
    app.use('/api', require('../api'))

    setupBeta(app) // Setup beta firewall for web version
    app.use('/', require('../web/web.routes.js'))

    // Handle Application Errors
    // This must be placed at the end of app code.
    handleErrors(app)
}