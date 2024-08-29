const express = require('express');
const router = express.Router();
const { auth, isEditor, isYouTuber } = require('../Middleware/auth');
const { upload, uploadVideo, approveVideo, deleteVideo, getVideoDetails, getVideos, rejectVideo,uploadVideoToYouTube } = require('../controller/VideoController');

router.post('upload/:id/videos', auth, isEditor, upload.single('video'), uploadVideo);

// Approve a video (YouTuber only)
router.put('videos/:id/approve/:videoId', auth, isYouTuber, approveVideo);

// Reject a video (YouTuber only)
router.put('videos/:id/reject/:videoId', auth, isYouTuber, rejectVideo);

// Get all videos in a workspace
router.get('workspace/:id', auth, getVideos);

// Get video details
router.get('videos/:id', auth, getVideoDetails);

// Delete video (YouTuber only)
router.delete('videos/:id', auth, deleteVideo);

router.post(':workspaceId/videos/:videoId/upload-to-youtube', auth, uploadVideoToYouTube);


module.exports = router;
