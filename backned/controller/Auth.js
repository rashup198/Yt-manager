const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const mailSender = require("../Middleware/mailSender");
const OTP = require("../models/OTP");
const crypto = require('crypto');
const EmailVerificationToken = require('../models/emailVerification');

require('dotenv').config();

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email exists in db
        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(400).json({
                success: false,
                message: "Email already exists, try with another email"
            });
        }

        // Generate OTP
        let otp = otpGenerator.generate(5, { digits: true, alphabets: false, upperCaseAlphabets: false, specialChars: false, upperCase: false });

        // Ensure OTP is unique
        while (await OTP.findOne({ otp })) {
            otp = otpGenerator.generate(5, { digits: true, alphabets: false, upperCaseAlphabets: false, specialChars: false, upperCase: false });
        }

        const otpPayload = { otp, email };

        await mailSender(
            email,
            "OTP Verification",
            `Your OTP for email verification is ${otp}. Please enter this OTP to verify your email.`
        );

        // Save OTP in db
        await OTP.create(otpPayload);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.signUp = async (req, res) => {
    try {
        const { email, password, firstName, lastName, role, youtubeChannelId } = req.body;

        // Check if all required fields are provided
        if (!email || !password || !firstName || !lastName || !role) {
            return res.status(400).json({
                success: false,
                message: 'Please fill up all required fields.',
            });
        }

        // Validate role
        if (!['YouTuber', 'Editor'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role specified.',
            });
        }

        // Check if YouTuber role is provided with youtubeChannelId
        if (role === 'YouTuber' && !youtubeChannelId) {
            return res.status(400).json({
                success: false,
                message: 'YouTube channel ID is required for YouTubers.',
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists.',
            });
        }

        // Create a new user
        const newUser = new User({
            email,
            password,
            firstName,
            lastName,
            role,
            youtubeChannelId
        });

        // Save the new user
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send success response
        res.status(201).json({
            success: true,
            token,
            user: {
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role,
                youtubeChannelId: newUser.youtubeChannelId,
            },
            message: 'User registered successfully.',
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Signup failed. Please try again later.',
        });
    }
};


exports.login = async (req, res) => {
    try {
        // Get email and password from request body
        const { email, password } = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill up all the required fields.',
            });
        }

        // Find user with provided email, including password for comparison
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            // If user not found with provided email
            return res.status(401).json({
                success: false,
                message: 'User is not registered with us. Please sign up to continue.',
            });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect.',
            });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { email: user.email, id: user._id, role: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h',
            }
        );

        // Ensure password is not sent back in response
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
            message: 'User login successful.',
        });
        console.log("this is the token", token);

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

        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email, current password, and new password.',
            });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect.',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

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

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        const token = crypto.randomBytes(32).toString('hex');

        await new EmailVerificationToken({ userId: user._id, token }).save();

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

        const emailVerificationToken = await EmailVerificationToken.findOne({ token });
        if (!emailVerificationToken) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired token.',
            });
        }

        const user = await User.findById(emailVerificationToken.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        user.verified = true;
        await user.save();

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