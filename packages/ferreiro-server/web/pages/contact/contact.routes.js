import express from 'express'
import {
    getContact,
    getContactTalk,
    getContactFeedback
} from './contact.controller'

const router = express.Router()

router.get('/', getContact)
router.get('/talk', getContactTalk)
router.get('/feedback', getContactFeedback)

module.exports = router
