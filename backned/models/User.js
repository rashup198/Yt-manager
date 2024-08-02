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
    youtubeChannelId: {
        type: String,
        required: function() {
            return this.role === 'YouTuber';
        },
        trim: true
    },
    tokens: [{
        accessToken: {
            type: String,
        },
        refreshToken: {
            type: String,
        }
    }],
    workspaces: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
    }]
}, {
    timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Ensure email is unique and indexed
UserSchema.index({ email: 1 }, { unique: true });

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual field for full name
UserSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', UserSchema);
