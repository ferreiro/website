const forceSsl = require('force-ssl-heroku')

module.exports = (app) => {
    // This is only valid for Heroku.
    // Change this if you're using other
    // hosting provider.
    if (process.env.NODE_ENV === 'production') {
        app.use(forceSsl)
    }
}