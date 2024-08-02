const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    editors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }],
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Workspace', WorkspaceSchema);
