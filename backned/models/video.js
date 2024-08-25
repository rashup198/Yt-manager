const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    url: {
        type: String,
        required: true
    },
    adaptiveUrl: {
        type: String,
        required: true
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    approvedAt: {
        type: Date
    },
    rejectedAt: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Video', videoSchema);
