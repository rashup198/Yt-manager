const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = async (req, res, next) => {
    try {
        // Extract token from header, body, or cookies
        const token = req.cookies.token || req.body.token || req.headers.authorization?.replace("Bearer ", "");

        // If no token found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token found"
            });
        }

        // Verify token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decoded", decoded);
            req.user = decoded; // Attach user info to request

            // Optional: Validate the user exists in the database
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found"
                });
            }

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


exports.isYouTuber = (req, res, next) => {
    if (req.user.role !== 'YouTuber') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Must be a YouTuber.',
        });
    }
    console.log('User is a YouTuber:', req.user);
    next();
};

exports.isEditor = (req, res, next) => {
    if (req.user.role !== 'Editor') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. You are not an editor.',
        });
    }
    console.log('User is an Editor:', req.user);
    next();
};
