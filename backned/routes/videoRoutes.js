const express = require('express');
const router = express.Router();
const { auth,isEditor } = require('../Middleware/auth');
const {uploadVideo} = require('../controller/VideoController');

router.post('/upload/:id/videos',auth, isEditor, uploadVideo);

module.exports = router;
