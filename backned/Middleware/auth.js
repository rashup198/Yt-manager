const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

// Authentication middleware
exports.auth = async (req, res, next) => {
    try {
        // Extract token from header, cookies, or body
        const token = req.cookies.token || req.body.token || req.headers.authorization?.replace("Bearer ", "");

        // If no token is found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token found"
            });
        }

        // Verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decode", decode);
            req.user = decode; // Assign decoded token data to req.user
        } catch (error) {
            console.log("error", error);
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later"
        });
    }
};

// Middleware to check if the user is a YouTuber
exports.isYouTuber = (req, res, next) => {
    if (req.user.role !== 'YouTuber') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. You are not a YouTuber.'
        });
    }
    next();
};

// Middleware to check if the user is an Editor
exports.isEditor = (req, res, next) => {
    if (req.user.role !== 'Editor') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. You are not an editor.'
        });
    }
    next();
};
