const Workspace = require('../models/Workspace');
const User = require('../models/User');

exports.createWorkspace = async (req, res) => {
    try {
        const { name, editors } = req.body;

        // Validate required fields
        if (!name || !Array.isArray(editors)) {
            return res.status(400).json({
                success: false,
                message: 'Name and editors are required.',
            });
        }

        // Ensure editors are valid users
        const validEditors = await User.find({ '_id': { $in: editors } });
        if (validEditors.length !== editors.length) {
            return res.status(400).json({
                success: false,
                message: 'Some editors are invalid.',
            });
        }

        // Create the workspace
        const newWorkspace = new Workspace({
            name,
            createdBy: req.user.userId,
            editors,
        });

        const savedWorkspace = await newWorkspace.save();

        res.status(201).json({
            success: true,
            workspace: savedWorkspace,
            message: 'Workspace created successfully.',
        });
    } catch (error) {
        console.error('Create workspace error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the workspace. Please try again.',
        });
    }
};

// Add Editors to Workspace
exports.addEditors = async (req, res) => {
    try {
        const { workspaceId, editors } = req.body;

        const validEditors = await User.find({ '_id': { $in: editors } });
        if (validEditors.length !== editors.length) {
            return res.status(400).json({
                success: false,
                message: 'Some editors are invalid.',
            });
        }

        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: 'Workspace not found.',
            });
        }

        workspace.editors.push(...editors);
        await workspace.save();

        res.status(200).json({
            success: true,
            workspace,
            message: 'Editors added successfully.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while adding editors.',
        });
    }
};

exports.getUserWorkspaces = async (req, res) => {
    try {
        const workspaces = await Workspace.find({ createdBy: req.user.userId });
        res.status(200).json({
            success: true,
            workspaces,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching workspaces.',
        });
    }
};