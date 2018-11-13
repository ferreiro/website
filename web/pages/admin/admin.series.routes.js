import express from 'express'
import {isAuthenticated} from './is-authenticated'
import {
  getAllSeries,
  createSeriesPage,
  createSeries,
  deleteSeriesConfirmationPage,
  deleteSeries,
  editPostPage,
  editPostSubmit,
} from './admin.series.controller'

const router = express.Router()

router.get('/', isAuthenticated, getAllSeries)
router.get('/create', isAuthenticated, createSeriesPage)
router.post('/create', isAuthenticated, createSeries)
router.get('/delete/:permalink', isAuthenticated, deleteSeriesConfirmationPage)
router.get('/delete/:permalink/confirm', isAuthenticated, deleteSeries)
router.get('/update/:permalink', isAuthenticated, editPostPage)
router.post('/update/:permalink', isAuthenticated, editPostSubmit)

module.exports = router
