const express = require('express');
const router = express.Router()
const quizControls = require('../NewWorkController/newWork')

router.route('/')
    .get(quizControls.getWork)
    .post(quizControls.createWork)
    .put(quizControls.resetWork)
module.exports = router