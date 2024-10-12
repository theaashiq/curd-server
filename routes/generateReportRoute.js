const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { generateReportData } = require('../controllers/generateReportController')

router.route('/')
    .post(generateReportData)

module.exports = router