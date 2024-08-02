const express = require('express');
const router = express.Router();
const { auth } = require('../Middleware/auth');
const { isYouTuber } = require('../Middleware/auth');
const { isEditor } = require('../Middleware/auth');
const {
    createWorkspace,
    getAllWorkspaces,
    getWorkspaceById,
    updateWorkspace,
    deleteWorkspace,
    inviteEditor
} = require('../controller/WorkspaceController');

router.post('/workspaces', auth, isYouTuber, createWorkspace);
router.get('/workspaces', auth, isYouTuber, getAllWorkspaces);
router.get('/workspaces/:id', auth, getWorkspaceById);  // Both YouTubers and Editors might need this
router.put('/workspaces/:id', auth, isYouTuber, updateWorkspace);
router.delete('/workspaces/:id', auth, isYouTuber, deleteWorkspace);
router.post('/workspaces/:id/invite', auth, isYouTuber, inviteEditor);

module.exports = router;
