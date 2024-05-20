const express = require('express')
const router = express.Router()
const getScoreControl = require('../controller.js/scoreController')

router.get('/', getScoreControl.setUserScore)
router.put('/', getScoreControl.allScoreToZero)

module.exports = router