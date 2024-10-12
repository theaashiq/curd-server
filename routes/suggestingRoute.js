const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { suggestData } = require('../controllers/suggestingController')

router.route('/')
    .post(suggestData)


module.exports = router