import express from 'express'
import {
    getNewsletter,
} from './newsletter.controller'

const router = express.Router()

router.get('/', getNewsletter)

module.exports = router
