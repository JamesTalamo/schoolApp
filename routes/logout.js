const express = require('express')
const router = express.Router()
const logoutControls = require('../controller.js/logoutController')

router.get('/', logoutControls.logoutHandler)

module.exports = router;