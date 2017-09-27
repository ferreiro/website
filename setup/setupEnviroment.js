const env = require('./env')

module.exports = app => {
  app.set('env', env)
}
