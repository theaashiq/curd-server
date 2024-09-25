const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { getMain, createMain, updateMain, deleteMain } = require('../controllers/mainController')

router.route('/')
    .get(getMain)
    .post(createMain)
    .put(updateMain)
    .delete(deleteMain)

module.exports = router