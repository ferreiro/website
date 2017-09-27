var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

module.exports = (app) => {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(username, password, done) {
      return done(null, { id: 'Jorge' });
      /*
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
      */
    }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    return done(null, { id: 'Jorge' })
    /*
    User.findById(id, function(err, user) {
      done(err, user);
    });
    */
  });

  app.use(passport.initialize())
  app.use(passport.session())

  return app
}