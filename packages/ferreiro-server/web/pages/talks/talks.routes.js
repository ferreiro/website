import express from 'express'
import {getTalks, getTalksTestimonials} from './talks.controller'

const router = express.Router()

router.get('/', getTalks)
router.get('/testimonials', getTalksTestimonials)

module.exports = router