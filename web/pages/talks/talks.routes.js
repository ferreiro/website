import express from 'express'
import {getTalks} from './talks.controller'

const router = express.Router()

router.get('/', getTalks)

module.exports = router