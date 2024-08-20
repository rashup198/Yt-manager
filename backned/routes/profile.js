const express = require('express');
const router = express.Router();
const { auth } = require("../Middleware/auth");

// Import the controller functions
const { updateProfile, deleteProfile, getAllUserDetails, getWorkSpace ,changePassword} = require("../controller/Profile.js");

// Delete profile
router.delete('/deleteProfile', auth, deleteProfile);

// Update profile
router.put('/updateProfile', auth, updateProfile);

// Get all user details
router.get('/getUserDetails', auth, getAllUserDetails);

// Get workspace 
router.get('/getWorkspace', auth, getWorkSpace);
router.post('/changePassword', auth, changePassword);

module.exports = router;
