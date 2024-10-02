const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const {createMain, updateMain, deleteMain } = require('../controllers/mainController')

router.route('/create')
    .post(createMain)

router.route('/update')
    .put(updateMain)

router.route('/delete')
    .delete(deleteMain)

module.exports = router