const User = require('../web/models/User')

module.exports = () => {
  if (process.env.NODE_ENV === 'DEV') {
    createAdminUser({
      email: 'admin',
      password: 'admin'
    })
  } else {
    const productionAdminEmail = process.env.ADMIN_EMAIL
    const productionAdminPass = process.env.ADMIN_PASS
    return createAdminUser({
      email: productionAdminEmail,
      password: productionAdminPass
    })
  }
}

function createAdminUser (data) {
  const email = data.email
  const passd = data.password

  if (!email || !passd) {
    throw new Error('Admin user can not have null values')
  }

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
