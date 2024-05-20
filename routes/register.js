const express = require('express')
const router = express.Router()
const registerControl = require('../controller.js/registerController')

router.post('/', registerControl.registerHandler)

module.exports = router;