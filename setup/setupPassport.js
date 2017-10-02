const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash')

const User = require('../web/models/User')

module.exports = (app) => {
  app.use(flash()) // before passport!
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({ email: email }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false)
        }
        user.validatePassword(password, (err, isValid) => {
          if (isValid) {
            return done(null, user)
          }
          return done(null, false)
        })
      })
    }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user.email)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })

  app.use(passport.initialize())
  app.use(passport.session())

  return app
}