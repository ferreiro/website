const express = require('express')
const router = express.Router()
const passport = require('passport')
const Recaptcha = require('express-recaptcha')

const env = require('../../env')
const blogRepository = require('../repository/blog')
const recaptcha = new Recaptcha(env.RECAPTCHA_PUBLIC, env.RECAPTCHA_SECRET)

router.get('/', isAuthenticated, getAllPosts)
router.get('/published', isAuthenticated, getPublishedPosts)
router.get('/drafts', isAuthenticated, getDraftsPosts)
router.get('/logout', logout)
router.get('/login', login)
router.post('/login', recaptcha.middleware.verify, postLogin, passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/login',
  failureFlash: 'Invalid password or username.'
}))
// router.get('/drafts', getDrafts)
router.get('/create', isAuthenticated, createPostComposer)
router.post('/create', isAuthenticated, postNewBlog)
router.get('/edit/:permalink', isAuthenticated, editPostPage)
router.post('/edit/:permalink', isAuthenticated, editPostSubmit)
router.get('/delete/:permalink', isAuthenticated, deletePostConfirmation)
router.get('/delete/:permalink/confirm', isAuthenticated, deletePost)

module.exports = router

function isAuthenticated (req, res, next) {
  // if not logged in, redirect
  if (!req.user) {
    return res.redirect('/admin/login')
  }
  return next()
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

function postLogin(req, res, next) {
  if (!req.recaptcha.error) {
    return next()
  }
  res.render('admin/login', {
    error: 'Recaptcha not valid.'
  })
}

function getAllPosts (req, res, next) {
  var locals = {
    title: 'Posts',
    path: 'admin',
    admin: true
  }
  blogRepository.getAll().then(posts => {
    locals.posts = posts
    res.render('admin/home', locals)
  }).catch(err => {
    locals.error = err
    res.render('admin/home', locals)
  })
}
function getPublishedPosts (req, res, next) {
  var locals = {
    title: 'Published',
    path: 'admin',
    admin: true
  }
  blogRepository.getAllPublished().then(posts => {
    locals.posts = posts
    res.render('admin/home', locals)
  }).catch(err => {
    locals.error = err
    res.render('admin/home', locals)
  })
}
function getDraftsPosts (req, res, next) {
  var locals = {
    title: 'Drafts',
    path: 'admin',
    admin: true
  }
  blogRepository.getAllDrafts().then(posts => {
    locals.posts = posts
    res.render('admin/home', locals)
  }).catch(err => {
    locals.error = err
    res.render('admin/home', locals)
  })
}

function createPostComposer (req, res, next) {
  const context = {
    admin: true
  }
  res.render('admin/create', context)
}

function parseRequestPostData (req) {
  const title = req.body.post_title
  const pic = req.body.post_pic
  const permalink = req.body.post_permalink
  const authorName = req.body.post_author_name
  const authorPic = req.body.post_author_pic
  const summary = req.body.post_summary
  const body = req.body.post_body
  const published = req.body.post_isPublished

  const bodySanitized = body
  return {
    title: title,
    pic: pic,
    permalink: permalink,
    author_name: authorName,
    author_pic: authorPic,
    summary: summary,
    body: bodySanitized,
    published: published,
  }
}
function postNewBlog (req, res, next) {
  const postData = parseRequestPostData(req)
  blogRepository.create(postData).then((post) => {
    return res.render('admin/home', {
      success: 'Post with id: created!',
      post: post,
      admin: true
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
  blogRepository.findByPermalink({
    permalink: postPermalink
  }).then(post => {
    return res.render('admin/create', {
      edit: true,
      post: post,
      admin: true
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
    return res.redirect('/admin/edit/' + post.permalink)
    /*
    return res.render('admin/create', {
      success: 'Post updated!',
      edit: true,
      post: post,
      admin: true
    })
    */
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
  res.send('Are you sure you want to delete the post?<br /><a href="/admin">Cancel</a><a href="/admin/delete/' + postPermalink + '/confirm">Yes. I know this action can not be undo</a>')
}

function deletePost (req, res, next) {
  const postPermalink = req.params.permalink
  blogRepository.findAndDeleteByPermalink(postPermalink).then(post => {
    return res.redirect('/admin')
  }).catch((err) => {
    return res.render('admin/home', {
      error: 'Failed to update post.'
    })
  })
}