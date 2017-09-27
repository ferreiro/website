const passport = require('passport')

module.exports = function (router) {
  router.get('/home', getAdmin)
  router.get('/logout', logout)
  router.get('/login', login)
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin/home',
    failureRedirect: '/login',
    failureFlash: 'Invalid password or username.'
  }))
  // router.get('/drafts', getDrafts)
  router.get('/create', createPostComposer)
  router.post('/create', createPostSubmit)
  router.get('/edit/:postId', editPostPage)
  router.post('/edit/:postId', editPostSubmit)
  router.get('/delete/:postId', deletePostConfirmation)
  router.post('/delete/:postId', deletePost)

  return router
}

function getAdmin (req, res, next) {
  // if not logged in, redirect
  if (!req.user) {
    return res.redirect('/admin/login')
  }
  res.render('admin/home', {
    title: 'Admin',
    path: 'admin'
  })
}

function logout (req, res, next) {
  req.logout();
  res.redirect('/admin')
}

function login (req, res, next) {
  var message = null
  if (req.flash('error').length > 0) {
    message = 'Invalid password or email.'
  }

  res.render('admin/login', {
    message: message
  })
}
function submitLogin(req, res, next) {
  return passport.authenticate('local', {
    successRedirect: '/admin/home',
    failureRedirect: '/login',
    failureFlash: true
  })
    /*

  const email = req.body.user_mail
  const password = req.body.user_password

  const validLogin = false
  if (!validLogin) {
    return res.render('admin/login', {
      error: 'Invalid credentials.'
    })
  }
  return res.redirect('/admin')
  */
}

function createPostComposer (req, res, next) {
  res.render('admin/create')
}
function createPostSubmit (req, res, next) {
  const title = req.body.post_title
  const permalink = req.body.post_permalink
  const author = req.bodypost_author_name
  const summary = req.body.post_summary
  const body = req.body.post_body
  const published = req.body.post_isPublished

  const bodySanitized = body.replace('\n', '<br />')

  const failedPostCreation = false
  if (!failedPostCreation) {
    return res.render('admin/create', {
      error: 'Failed to create new post.'
    })
  }
  return res.render('admin/home', {
    success: 'Post with id: created!'
  })
}

function editPostPage (req, res, next) {
  res.render('admin/create', {
    edit: true,
    data: {
      id: 323242,
      permalink: 'awesome-title',
      title: 'Awesome title',
      author: 'Jorge Ferreiro',
      summary: 'fslkdjflkasdjf',
      body: '# This is my body\nsdfsdf',
      published: true
    }
  })
}

function editPostSubmit (req, res, next) {
  res.send('Post updated!')
}


function deletePostConfirmation (req, res, next) {
  // find post.
  // show confirmation screen.
  res.send('Are you sure you want to delete the post?')
}

function deletePost (req, res, next) {
  // find post.
  // delete post.
  // if deleted => notifiy view.
  // else => render same view, notifiying error 
  res.send('Post deleted!')
}