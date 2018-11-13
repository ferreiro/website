import express from 'express'
import passport from 'passport'
import Recaptcha from 'express-recaptcha'

import seriesRouter from './admin.series.routes'
import env from '../../../env'
import {isAuthenticated} from './is-authenticated'
import {
  login,
  logout,
  postLogin,
  getAllPosts,
  getPublishedPosts,
  getDraftsPosts,
  createPostComposer,
  postNewBlog,
  editPostPage,
  editPostSubmit,
  deletePostConfirmation,
  deletePost
} from './admin.controller'

const router = express.Router()
const recaptcha = new Recaptcha(env.RECAPTCHA_PUBLIC, env.RECAPTCHA_SECRET)

// Application resources routes
router.get('/', isAuthenticated, getAllPosts)
router.get('/published', isAuthenticated, getPublishedPosts)
router.get('/drafts', isAuthenticated, getDraftsPosts)
router.get('/create', isAuthenticated, createPostComposer)
router.post('/create', isAuthenticated, postNewBlog)
router.get('/edit/:permalink', isAuthenticated, editPostPage)
router.post('/edit/:permalink', isAuthenticated, editPostSubmit)
router.get('/delete/:permalink', isAuthenticated, deletePostConfirmation)
router.get('/delete/:permalink/confirm', isAuthenticated, deletePost)

router.use('/series', isAuthenticated, seriesRouter)

// General access routes
router.get('/logout', logout)
router.get('/login', login)
router.post('/login', recaptcha.middleware.verify, postLogin, passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/admin/login',
  failureFlash: 'Invalid password or username.'
}))

module.exports = router