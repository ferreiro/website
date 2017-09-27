const passport = require('passport')

const blogRepository = require('../repository/blog')

module.exports = function (router) {
  router.get('/home', isAuthenticated, getAdmin)
  router.get('/logout', logout)
  router.get('/login', login)
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin/home',
    failureRedirect: '/login',
    failureFlash: 'Invalid password or username.'
  }))
  // router.get('/drafts', getDrafts)
  router.get('/create', isAuthenticated, createPostComposer)
  router.post('/create', isAuthenticated, createPostSubmit)
  router.get('/edit/:permalink', isAuthenticated, editPostPage)
  router.post('/edit/:permalink', isAuthenticated, editPostSubmit)
  router.get('/delete/:permalink', isAuthenticated, deletePostConfirmation)
  router.get('/delete/:permalink/confirm', isAuthenticated, deletePost)

  return router
}

function isAuthenticated (req, res, next) {
  // if not logged in, redirect
  if (!req.user) {
    return res.redirect('/admin/login')
  }
  return next()
}

function getAdmin (req, res, next) {
  var locals = {
    title: 'Admin',
    path: 'admin'
  }
  blogRepository.getAll().then(posts => {
    locals.posts = posts
    res.render('admin/home', locals)
  }).catch(err => {
    locals.error = err
    res.render('admin/home', locals)
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

function parseRequestPostData (req) {
  const title = req.body.post_title
  const pic = req.body.post_pic
  const permalink = req.body.post_permalink
  const author = req.body.post_author_name
  const summary = req.body.post_summary
  const body = req.body.post_body
  const published = req.body.post_isPublished

  const bodySanitized = body.replace('\n', '<br />')
  return {
    title: title,
    pic: pic,
    permalink: permalink,
    author: author,
    summary: summary,
    body: bodySanitized,
    published: published,
  }
}
function createPostSubmit (req, res, next) {
  const postData = parseRequestPostData(req)
  blogRepository.create(postData).then((post) => {
    return res.render('admin/home', {
      success: 'Post with id: created!',
      post: post
    })
  }).catch((err) => {
    console.log(err)
    return res.render('admin/create', {
      error: 'Failed to create new post.'
    })
  })
}

function editPostPage (req, res, next) {
  const postPermalink = req.params.permalink
  blogRepository.findByPermalink(postPermalink).then(post => {
    return res.render('admin/create', {
      edit: true,
      post: post
    })
  }).catch((err) => {
    return res.render('admin/home', {
      error: 'Failed to create new post.'
    })
  })
}

function editPostSubmit (req, res, next) {
  const postPermalink = req.params.permalink
  const postData = parseRequestPostData(req)
  blogRepository.findAndUpdateByPermalink(postPermalink, postData).then(post => {
    return res.render('admin/home', {
      success: 'Updated post!'
    })
  }).catch((err) => {
    return res.render('admin/home', {
      error: 'Failed to update post.'
    })
  })
}


function deletePostConfirmation (req, res, next) {
  // find post.
  // show confirmation screen.
  const postPermalink = req.params.permalink
  res.send('Are you sure you want to delete the post?<br /><a href="/admin/home">Cancel</a><a href="/admin/delete/' + postPermalink + '/confirm">Yes. I know this action can not be undo</a>')
}

function deletePost (req, res, next) {
  const postPermalink = req.params.permalink
  blogRepository.findAndDeleteByPermalink(postPermalink).then(post => {
    return res.redirect('/admin/home')
  }).catch((err) => {
    return res.render('admin/home', {
      error: 'Failed to update post.'
    })
  })
}