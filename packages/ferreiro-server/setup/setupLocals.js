const content = require('../web/content/english')

module.exports = (app) => {
    app.locals.menu = content.menu
    app.locals.social = content.social

    setupUserLocals(app)
}

function setupUserLocals (app) {
    app.use(function (req, res, next) {
        app.locals.user = req.user
        app.locals.admin = req.user && !req.query.disableAdmin ? true : false

        return next()
    })
}