const mongoose = require('mongoose');
const mailSender = require('../Middleware/mailSender');

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  otp: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60 // Document will expire in 5 minutes
  }
});

// Function to generate OTP and send email
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await await mailSender(
      email,
      "OTP Verification",
      `
      <p>Hello,</p>
    
      <p>We received a request to verify the email address associated with your account. To complete the verification process, please use the OTP (One-Time Password) provided below:</p>
    
      <h3>Your OTP: <strong>${otp}</strong></h3>
    
      <p>Please enter this OTP within the next 5 minutes to verify your email address. For security reasons, the OTP will expire after that time.</p>
    
      <p>If you did not request this verification, please ignore this email.</p>
    
      <p>If you need any assistance, feel free to contact me rashup198@gmail.com</p>
    
      <p>Thank you,</p>
      `
    );
    console.log("mailResponse", mailResponse);
  } catch (error) {
    console.log("Error in sending verification email", error);
    throw new Error(error);
  }
}

// Pre-save hook to send email only when a new document is created
OTPSchema.pre('save', async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model('OTP', OTPSchema);
