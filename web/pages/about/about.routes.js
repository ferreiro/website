import express from 'express'
import {getAboutPage} from './about.controller'

const router = express.Router()

router.get('/', getAboutPage)

module.exports = router
