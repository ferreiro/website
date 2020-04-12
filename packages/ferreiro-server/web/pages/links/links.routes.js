import express from 'express'
import {getLinksPage} from './links.controller'

const router = express.Router()

router.get('/', getLinksPage)

module.exports = router
