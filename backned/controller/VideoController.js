const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const Video = require('../models/Video.js');
const Workspace = require('../models/Workspace.js');
const cloudinary = require('../Middleware/cloudinary.js');
const { Readable } = require('stream');
const axios = require('axios');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs'); 
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        // Validate video file
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

        // Convert buffer to stream
        const bufferStream = new Readable();
        bufferStream.push(req.file.buffer);
        bufferStream.push(null);

        // Upload video to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'video',
                folder: 'videos',
                public_id: uuidv4(),
                eager: [
                    { streaming_profile: 'hd', format: 'm3u8' },
                    { streaming_profile: 'sd', format: 'm3u8' }
                ],
                eager_async: true,
                timeout: 120000
            },
            async (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({
                        success: false,
                        message: 'Error uploading video to Cloudinary'
                    });
                }

                try {
                    // Create a new video entry in the database
                    const video = new Video({
                        title,
                        description,
                        url: result.secure_url, 
                        adaptiveUrl: result.eager[0].secure_url, 
                        workspace: id
                    });

                    console.log("this is",video);
                    
                    // Save the video
                    const savedVideo = await video.save();

                    // Add video to workspace's video list
                    workspace.videos.push(savedVideo._id);
                    await workspace.save();

                    res.status(201).json({
                        success: true,
                        message: 'Video uploaded successfully',
                        video: savedVideo
                    });
                } catch (err) {
                    console.error('Error saving video:', err);
                    res.status(500).json({
                        success: false,
                        message: 'Error saving video to database'
                    });
                }
            }
        );

        // Pipe the video buffer to Cloudinary
        bufferStream.pipe(uploadStream);
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
        if (video.approvalStatus === 'approved') {
            return res.status(400).json({
                success: false,
                message: 'Video is already approved'
            });
        }

        // Approve video
        video.approvalStatus = 'approved';
        video.approvedAt = Date.now();
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
        if (video.approvalStatus === 'rejected') {
            return res.status(400).json({
                success: false,
                message: 'Video is already rejected'
            });
        }

        // Reject video
        video.approvalStatus = 'rejected';
        video.rejectedAt = Date.now();
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

        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'Video not found'
            });
        }

        const publicId = video.url.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });

        await Video.deleteOne({ _id: id });

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

async function uploadVideoToYouTube(req, res) {
    const { workspaceId, videoId } = req.params;

    try {
        // Find the video by ID
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'Video not found'
            });
        }

        // Find the workspace by ID
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found' });
        }

        const oauth2Client = new google.auth.OAuth2(
            process.env.client_id,
            process.env.client_secret,
            process.env.redirect_uri
        );

 
        oauth2Client.setCredentials({
            access_token: workspace.youtubeAccessToken,
            refresh_token: workspace.youtubeRefreshToken,
        });

        const youtube = google.youtube({
            version: 'v3',
            auth: oauth2Client,
        });

        // Download video file from the URL
        const videoFilePath = path.join(__dirname, 'temp_video.mp4');
        const response = await axios({
            url: video.url,
            method: 'GET',
            responseType: 'stream',
        });
        response.data.pipe(fs.createWriteStream(videoFilePath));

        // Wait for the file to be saved
        await new Promise((resolve, reject) => {
            response.data.on('end', resolve);
            response.data.on('error', reject);
        });

        // Upload video to YouTube
        const uploadResponse = await youtube.videos.insert({
            part: 'snippet,status',
            requestBody: {
                snippet: {
                    title: video.title,
                    description: video.description,
                    tags: ['video', 'upload', 'youtube'],
                },
                status: {
                    privacyStatus: 'public',
                },
            },
            media: {
                body: fs.createReadStream(videoFilePath), 
            },
        });

        // Clean up the temporary video file
        fs.unlinkSync(videoFilePath);

        return res.status(200).json({ message: 'Video uploaded to YouTube', data: uploadResponse.data });
    } catch (error) {
        console.error('Error uploading video to YouTube:', error);
        return res.status(500).json({ error: 'Failed to upload video to YouTube' });
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
    getAllVideos,
    uploadVideoToYouTube,
};
