const content = require('./web/content/english')

module.exports = (app) => {
  app.locals.menu = content.menu
  app.locals.social = content.social
}
