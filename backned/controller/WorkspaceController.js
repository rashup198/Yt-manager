const Workspace = require('../models/Workspace');
const User = require('../models/User');
const Video = require('../models/Video');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const mailSender = require("../Middleware/mailSender");


exports.createWorkspace = async (req, res) => {
    try {
        const { name, description } = req.body;
        const ownerId = req.user.id;  // Assuming `req.user` is populated by middleware

        const workspace = new Workspace({
            name,
            description,
            owner: ownerId
        });

        const savedWorkspace = await workspace.save();

        const user = await User.findById(ownerId);
        user.workspaces.push(savedWorkspace._id);
        await user.save();

        res.status(201).json({
            success: true,
            workspace: savedWorkspace
        });
    } catch (error) {
        console.error('Error creating workspace:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating workspace'
        });
    }
};

exports.getAllWorkspaces = async (req, res) => {
    try {
        const ownerId = req.user.id; 

        const workspaces = await Workspace.find({ owner: ownerId }).populate('editors videos');

        res.status(200).json({
            success: true,
            workspaces
        });
    } catch (error) {
        console.error('Error retrieving workspaces:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving workspaces'
        });
    }
};

exports.getWorkspaceById = async (req, res) => {
    try {
        const { id } = req.params;

        const workspace = await Workspace.findById(id).populate('editors videos');

        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: 'Workspace not found'
            });
        }

        res.status(200).json({
            success: true,
            workspace
        });
    } catch (error) {
        console.error('Error retrieving workspace:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving workspace'
        });
    }
};

exports.updateWorkspace = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const workspace = await Workspace.findById(id);

        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: 'Workspace not found'
            });
        }

        workspace.name = name || workspace.name;
        workspace.description = description || workspace.description;

        const updatedWorkspace = await workspace.save();

        res.status(200).json({
            success: true,
            workspace: updatedWorkspace
        });
    } catch (error) {
        console.error('Error updating workspace:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating workspace'
        });
    }
};

exports.deleteWorkspace = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the workspace by its ID
        const workspace = await Workspace.findByIdAndDelete(id);

        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: 'Workspace not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Workspace deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting workspace:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting workspace',
        });
    }
};



exports.inviteEditor = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;

        const workspace = await Workspace.findById(id);
        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: 'Workspace not found'
            });
        }

        const editor = await User.findOne({ email, role: 'Editor' });
        if (!editor) {
            return res.status(404).json({
                success: false,
                message: 'Editor not found'
            });
        }

        // Ensure the `editors` field is initialized as an array
        if (!workspace.editors) {
            workspace.editors = [];
        }

        // Ensure the `workspaces` field is initialized as an array
        if (!editor.workspaces) {
            editor.workspaces = [];
        }

        // Add editor to workspace and workspace to editor
        workspace.editors.push(editor._id);
        await workspace.save();

        editor.workspaces.push(workspace._id);
        await editor.save();

        res.status(200).json({
            success: true,
            message: 'Editor invited successfully',
            workspace
        });

        // Generate a unique invitation token and send an email
        const inviteToken = uuidv4();
        editor.invites.push({ token: inviteToken, workspace: workspace._id });
        await editor.save();


        const inviteLink = `${process.env.FRONTEND_URL}/confirm-invite?token=${inviteToken}`;
        

        await mailSender(
            email,
            "Invite from Yt",
            `This is the invite from the yt Join now ${inviteLink}`
        );

    } catch (error) {
        console.error('Error inviting editor:', error);
        res.status(500).json({
            success: false,
            message: 'Error inviting editor'
        });
    }
};


exports.confirmInvite = async (req, res) => {
    try {
        const { token } = req.query;

        const editor = await User.findOne({ 'invites.token': token });
        if (!editor) {
            return res.status(404).json({ success: false, message: 'Invalid or expired token' });
        }

        const invite = editor.invites.find(inv => inv.token === token);
        const workspace = await Workspace.findById(invite.workspace);

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        // Add editor to workspace and workspace to editor
        workspace.editors.push(editor._id);
        await workspace.save();

        editor.workspaces.push(workspace._id);
        editor.invites = editor.invites.filter(inv => inv.token !== token); // Remove used invite
        await editor.save();

        res.status(200).json({
            success: true,
            message: 'Invitation accepted. You have joined the workspace.'
        });
    } catch (error) {
        console.error('Error confirming invite:', error);
        res.status(500).json({
            success: false,
            message: 'Error confirming invite'
        });
    }
};

