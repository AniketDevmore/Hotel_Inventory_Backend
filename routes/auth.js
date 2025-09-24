const express = require('express');
const router = express.Router();
const { loginFunction, signupFunction, sendResetMail, resetPassword } = require('../controller/authController');
const { checkPassword, encryptPassword, varifyUser, verifyResetToken } = require('../middleware/authMiddleware');

router.post('/signin', checkPassword, loginFunction);
router.post('/signup', encryptPassword, signupFunction);
router.post('/forgot_password', varifyUser, sendResetMail);
router.post("/reset-password/:token", verifyResetToken, encryptPassword, resetPassword);
// http://localhost:3000/reset-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmlrZXRAeW9wbWFpbC5jb20iLCJpYXQiOjE3NTg2NTQ4OTcsImV4cCI6MTc1ODY1NTc5N30.gF6yt1Oli5Cf3g1sRR-z_kDFOS7zqkAmZfuZKpZZRYY
module.exports = router;