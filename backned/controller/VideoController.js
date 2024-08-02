const multer = require('multer');
const Video = require('../models/Video');
const Workspace = require('../models/Workspace');
const s3 = require('../Middleware/aws');

const upload = multer({ storage: multer.memoryStorage() });

exports.uploadVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

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