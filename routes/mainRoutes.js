const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { getMain, createMain, updateMain, deleteMain, fetchMainData } = require('../controllers/mainController')

router.route('/')
    .get(fetchMainData)

module.exports = router