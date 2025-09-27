const express = require('express');
const router = express.Router();
const { loginFunction, signupFunction, sendResetMail, resetPassword } = require('../controller/authController');
const { checkPassword, encryptPassword, varifyUser, verifyResetToken } = require('../middleware/authMiddleware');

router.post('/signin', checkPassword, loginFunction);
router.post('/signup', encryptPassword, signupFunction);
router.post('/forgot_password', varifyUser, sendResetMail);
router.post("/reset-password/:token", verifyResetToken, encryptPassword, resetPassword);

module.exports = router;