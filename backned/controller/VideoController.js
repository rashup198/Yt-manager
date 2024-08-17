const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const aws = require('aws-sdk');
const Video = require('../models/Video');
const mongoose = require('mongoose');
const Workspace = require('../models/Workspace');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    httpOptions: {
        timeout: 300000 // 5 minutes timeout
    }
});

const uploadVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        // Validate and parse video file from request
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({
                success: false,
                message: 'No video file provided'
            });
        }

        // Check if workspace exists
        const workspace = await Workspace.findById(id);
        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: 'Workspace not found'
            });
        }

        // Upload video to AWS S3
        const uploadResult = await s3.upload({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `videos/${Date.now()}_${req.file.originalname}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }).promise();

        // Create a new video entry in the database
        const video = new Video({
            title,
            description,
            url: uploadResult.Location, // URL from S3
            workspace: id
        });

        const savedVideo = await video.save();

        // Add video to workspace's video list
        workspace.videos.push(savedVideo._id);
        await workspace.save();

        res.status(201).json({
            success: true,
            message: 'Video uploaded successfully',
            video: savedVideo
        });
    } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading video'
        });
    }
};

const approveVideo = async (req, res) => {
    try {
        const { id, videoId } = req.params;

        // Check if workspace exists
        const workspace = await Workspace.findById(id);
        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: 'Workspace not found'
            });
        }

        // Check if video exists
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'Video not found'
            });
        }

        // Check if video is already approved
        if (video.status === 'approved') {
            return res.status(400).json({
                success: false,
                message: 'Video is already approved'
            });
        }

        // Approve video
        video.status = 'approved';
        await video.save();

        res.status(200).json({
            success: true,
            message: 'Video approved successfully',
            video
        });
    } catch (error) {
        console.error('Error approving video:', error);
        res.status(500).json({
            success: false,
            message: 'Error approving video'
        });
    }
};

const rejectVideo = async (req, res) => {
    try {
        const { id, videoId } = req.params;

        // Check if workspace exists
        const workspace = await Workspace.findById(id);
        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: 'Workspace not found'
            });
        }

        // Check if video exists
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'Video not found'
            });
        }

        // Check if video is already rejected
        if (video.status === 'rejected') {
            return res.status(400).json({
                success: false,
                message: 'Video is already rejected'
            });
        }

        // Reject video
        video.status = 'rejected';
        await video.save();

        res.status(200).json({
            success: true,
            message: 'Video rejected successfully',
            video
        });
    } catch (error) {
        console.error('Error rejecting video:', error);
        res.status(500).json({
            success: false,
            message: 'Error rejecting video'
        });
    }
};

const getVideos = async (req, res) => {
    try {
        // Retrieve and trim the workspace ID
        const { id } = req.params;
        const trimmedId = id.trim();

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid workspace ID format'
            });
        }

        // Check if workspace exists
        const workspace = await Workspace.findById(trimmedId);
        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: 'Workspace not found'
            });
        }

        // Get all videos in the workspace
        const videos = await Video.find({ workspace: trimmedId });

        res.status(200).json({
            success: true,
            videos
        });
    } catch (error) {
        console.error('Error getting videos:', error);
        res.status(500).json({
            success: false,
            message: 'Error getting videos'
        });
    }
};


const getVideoDetails = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if video exists
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'Video not found'
            });
        }

        res.status(200).json({
            success: true,
            video
        });
    } catch (error) {
        console.error('Error getting video details:', error);
        res.status(500).json({
            success: false,
            message: 'Error getting video details'
        });
    }
};

 const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if video exists
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'Video not found'
            });
        }

        // Delete video from S3
        const s3 = new aws.S3();
        const videoKey = video.url.split('/').pop(); // Assuming the S3 key is the filename
        await s3.deleteObject({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `videos/${videoKey}`
        }).promise();

        // Delete video entry from database
        await Video.deleteOne({ _id: id });

        // Remove video from workspace's video list
        const workspace = await Workspace.findById(video.workspace);
        if (workspace) {
            workspace.videos.pull(id);
            await workspace.save();
        }

        res.status(200).json({
            success: true,
            message: 'Video deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting video:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting video'
        });
    }
};

// get all videos 

const getAllVideos = async (req, res)=>{
    try {
        const videos = await Video.find().populate('workspace');

        if (!videos || videos.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No videos found.',
            });
        }

        // Return the videos
        res.status(200).json({
            success: true,
            data: videos,
        });
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch videos. Please try again later.',
        });
    }
}


module.exports = {
    upload,
    uploadVideo,
    approveVideo,
    rejectVideo,
    getVideos,
    getVideoDetails,
    deleteVideo,
    getAllVideos
};
