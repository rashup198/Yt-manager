const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    role: {
        type: String,
        enum: ['YouTuber', 'Editor'],
        required: [true, 'Role is required']
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date
    },
    tokens: {
        accessToken: {
            type: String,
        }
    },
    workspaces: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
    }],
    invites: [{
        token: { type: String, required: true },
        workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
        status: { type: String, enum: ['Pending', 'Accepted', 'Declined'], default: 'Pending' }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
