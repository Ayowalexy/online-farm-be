const express = require('express');
const router = express.Router();
const { login, signUp } = require('../controllers/auth')

router.route('/signup').post(signUp);
router.route('/login').post(login);


module.exports = router