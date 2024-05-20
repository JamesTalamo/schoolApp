const express = require('express');
const router = express.Router()
const { getUsers } = require('../controller.js/getAllUsersController');

router.get('/', getUsers);


module.exports = router