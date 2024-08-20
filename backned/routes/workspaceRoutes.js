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
    inviteEditor,
    confirmInvite
} = require('../controller/WorkspaceController');

router.post('/workspaces', auth, isYouTuber, createWorkspace);
router.get('/workspaces', auth, getAllWorkspaces);
router.get('/workspaces/:id', auth, getWorkspaceById);  
router.put('/workspaces/:id', auth, isYouTuber, updateWorkspace);
router.delete('/workspaces/:id', auth, isYouTuber, deleteWorkspace);
router.post('/workspaces/:id/invite', auth, isYouTuber, inviteEditor);
router.get('/confirm-invite', auth, confirmInvite)

module.exports = router;
