const express = require('express');
const router = express.Router();
const {create} = require('../controllers/user.controller');
const userController = require('../controllers/user.controller');

router.post('/create-user',create)
router.post('/user-login', userController.login)

module.exports = router