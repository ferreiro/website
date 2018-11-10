const express = require('express')
const router = express.Router()

import {getAboutPage} from './about.controller';

router.get('/', getAboutPage)

module.exports = router
