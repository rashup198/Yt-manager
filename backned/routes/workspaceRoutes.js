const express = require('express');
const router = express.Router();
const {
    createWorkspace,
    getUserWorkspaces,
    addEditors
} = require('../controllers/workspaceController');
const { auth, isYouTuber } = require('../Middleware/auth');

// Create Workspace
router.post('/create', auth, isYouTuber, createWorkspace);

// Get User Workspaces
router.get('/', auth, getUserWorkspaces);

// Add Editors to Workspace
router.post('/add-editors', auth, isYouTuber, addEditors);

module.exports = router;
