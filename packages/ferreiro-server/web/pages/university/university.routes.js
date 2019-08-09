import express from 'express'
import {
    getUniversity,
} from './university.controller'

const router = express.Router()

router.get('/', getUniversity)

module.exports = router
