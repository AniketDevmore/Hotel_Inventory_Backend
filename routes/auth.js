const express = require('express');
const router = express.Router();
const { loginFunction, signupFunction } = require('../controller/authController');
const { checkPassword, encryptPassword } = require('../middleware/authMiddleware');

router.post('/signin', checkPassword, loginFunction);
router.post('/signup', encryptPassword, signupFunction);

module.exports = router;