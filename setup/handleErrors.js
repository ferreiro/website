module.exports = (app) => {

  // Handle Errors
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // Development Error Handler.
  // Printing Stacktrace
  if (process.env.NODE_ENV === 'DEV') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500)
      res.render('./views/error', {
        message: err.message,
        error: err
      })
    })
  }

  // Production Error Handler.
  // No stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('./views/error', {
      message: err.message,
      error: {}
    })
  })
}
