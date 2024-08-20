const express = require('express');
const router = express.Router();

const { sendOTP,signUp ,login ,sendVerificationEmail, verifyEmail,resetPasswordToken ,resetPassword} = require('../controller/Auth'); 

// Route to send OTP
router.post('/send-otp', sendOTP);
router.post('/signup',signUp)
router.post('/login', login)
router.post('/send-verification-email', sendVerificationEmail);
router.get('/verify-email', verifyEmail);

//reset password token
router.post('/resetPasswordToken',resetPasswordToken);
//reset password after verifying token
router.post('/resetPassword',resetPassword);

module.exports = router;


