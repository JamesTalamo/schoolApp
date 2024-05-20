const path = require('path');


const express = require('express');
const router = express.Router()

router.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname,'..','auth','login.html'))
})

router.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname,'..','auth','register.html'))
})


module.exports = router;