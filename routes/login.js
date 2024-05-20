const express = require('express');
const router = express.Router()
const loginControls = require('../controller.js/loginController')

router.post('/', loginControls.loginHandler)
    
module.exports = router