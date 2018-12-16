import express from 'express'
import {getHomePage} from './home.controller'

const router = express.Router()

router.get('/', getHomePage)

module.exports = router
