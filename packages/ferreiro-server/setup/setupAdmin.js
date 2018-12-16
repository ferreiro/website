// TODO: Remove this. It should call the repository
const User = require('../api/models/User')

module.exports = (app) => {
  if (process.env.NODE_ENV === 'DEV') {
    const adminUserDevelopment = {
      email: 'admin',
      password: 'admin'
    }
    createAdminUser(adminUserDevelopment)
    setupFakeAdminSession(app, adminUserDevelopment)
  } else {
    const productionAdminEmail = process.env.ADMIN_EMAIL
    const productionAdminPass = process.env.ADMIN_PASS

    return createAdminUser({
      email: productionAdminEmail,
      password: productionAdminPass
    })
  }
}

function setupFakeAdminSession (app, adminUser) {
  app.use(function setupSession(req, res, next) {
    // Since its development, set fake admin user
    // in the session
    req.user = adminUser
    return next()
  })
}

function createAdminUser (data) {
  const email = data.email
  const passd = data.password

  if (!email || !passd) {
    throw new Error('Admin user can not have null values')
  }

  // TODO: Remove this. It should call the repository
  User.findOne({
    email: email
  }).then((user) => {
    if (user) {
      return;
    }

    const newAdminUser = new User({
      email: email,
      password: passd
    })

    newAdminUser.save(err => {
      if (err) {
        console.log('Can\'t create default user')
        throw Error(err)
      } else {
        console.log('Successfully created admin user')
      }
    })
  }).catch(err => {
    throw Error(err)
  })
}
