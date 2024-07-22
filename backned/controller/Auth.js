const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const mailSender = require("../Middleware/mailSender")
const OTP = require("../models/OTP");
require('dotenv').config();
const crypto = require('crypto');
const EmailVerificationToken = require('../models/emailVerification');

exports.sendOTP = async (req, res) => {

    try {

    //fetach email from req.body
    const { email } = req.body;

    //check if email exist in db
    const checkUserPresent= await User.findOne({ email });

    //if user exist then send response
    if(checkUserPresent){
        return res.status(400).json({
            success: false,
            message: "Email already exist try with another email"
        });
    }

    // generate otp
    var otp = otpGenerator.generate(5, { digits: true, alphabets: false, upperCaseAlphabets: false, specialChars: false,upperCase: false, });

    console.log("your otp is", otp);

    //check if otp already exist in db
    let result = await OTP.findOne({ otp: otp });

    while(result){
        otp = otpGenerator.generate(5, { digits: true, alphabets: false, upperCaseAlphabets: false, specialChars: false,upperCase: false, });
        result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = {otp,email}

    await mailSender(
        email,
        "OTP Verification",
        `Your OTP for email verification is ${otp}. Please enter this otp to verify your email.`
    );
    
    //save otp in db
    const otpBody = await OTP.create(otpPayload);
    console.log("otpBody", otpBody);

    res.status(200).json({
        success: true,
        message: "OTP sent successfully",
        otp
    });


    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message:error.message
        });
    }
}




exports.signUp = async (req, res) => {
    try {
        const { email, password, otp, firstName, lastName, role, youtubeChannelId } = req.body;

        // Check if all required fields are provided
        if (!email || !password || !otp || !firstName || !lastName || !role) {
            return res.status(400).json({
                success: false,
                message: 'Please fill up all the required fields.',
            });
        }

        // Verify OTP
        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP.',
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered.',
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('Hashed password during signup:', hashedPassword);

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role,
            youtubeChannelId: role === 'YouTuber' ? youtubeChannelId : undefined,
        });

        const savedUser = await newUser.save();
        console.log('Saved user:', savedUser);

        // Generate JWT token
        const token = jwt.sign(
            { userId: savedUser._id, role: savedUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Delete OTP after successful registration
        await OTP.deleteOne({ email, otp });

        // Set cookie for token and return success response
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
            httpOnly: true,
        };

        res.cookie('token', token, options).status(201).json({
            success: true,
            token,
            user: {
                email: savedUser.email,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                role: savedUser.role,
                youtubeChannelId: savedUser.youtubeChannelId,
            },
            message: 'User registered successfully.',
        });

    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({
            success: false,
            message: 'Signup failure. Please try again.',
        });
    }
};



exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide both email and password.',
        });
      }
  
      // Find user with provided email and include the password field
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found. Please register first.',
        });
      }
  
      // Compare password
      const passwordMatch = await user.comparePassword(password);
  
      if (passwordMatch) {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );
  
        // Save token to user document in database
        user.tokens.accessToken = token;
        await user.save();
  
        // Remove password from user object before returning
        user.password = undefined;
  
        // Set cookie for token and return success response
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
          httpOnly: true,
        };
        res.cookie('token', token, options).status(200).json({
          success: true,
          token,
          user,
          message: 'User Login Success',
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Password is incorrect',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        message: 'Login failure. Please try again.',
      });
    }
  };
  



exports.changePassword = async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;

        // Check if email, currentPassword, and newPassword are provided
        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email, current password, and new password.',
            });
        }

        // Find the user by email and include the password field
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        // Verify the current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect.',
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Save the new password to the database
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully.',
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while changing the password. Please try again.',
        });
    }
};




exports.sendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    // Generate a verification token
    const token = crypto.randomBytes(32).toString('hex');

    // Save the verification token
    await new EmailVerificationToken({ userId: user._id, token }).save();

    // Send verification email
    const verificationLink = `http://localhost:5173/verify-email?token=${token}`;
    await mailSender(
      user.email,
      'Email Verification',
      `Click on the link to verify your email: ${verificationLink}`
    );

    res.status(200).json({
      success: true,
      message: 'Verification email sent.',
      token
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while sending the verification email. Please try again.',
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    // Find the token
    const emailVerificationToken = await EmailVerificationToken.findOne({ token });
    if (!emailVerificationToken) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token.',
      });
    }

    // Verify the user's email
    const user = await User.findById(emailVerificationToken.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    user.verified = true;
    await user.save();

    // Delete the verification token
    await EmailVerificationToken.deleteOne({ _id: emailVerificationToken._id });

    res.status(200).json({
      success: true,
      message: 'Email verified successfully.',
    });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while verifying the email. Please try again.',
    });
  }
};

