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



// Pre-save hook to send email only when a new document is created
OTPSchema.pre('save', async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
  
});

module.exports = mongoose.model('OTP', OTPSchema);
