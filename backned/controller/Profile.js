const User = require('../models/User');
const Profile = require('../models/Profile');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
exports.updateProfile = async (req, res) => {
    try {
        // Fetch data from the request body
        const { dateOfBirth = "", contactNumber, about = "" } = req.body;
        
        // Fetch user id from the authenticated user
        const id = req.user._id;
        console.log(id)

        // Validate the required fields
        if (!about || !dateOfBirth) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Find user by ID
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if additionalDetails is available
        if (!userDetails.additionalDetails) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        // Find profile by ID stored in additionalDetails
        const profile = await Profile.findById(userDetails.additionalDetails);
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        // Update the profile fields
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;

        // Save the updated profile
        await profile.save();

        // Send the response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: profile,
        });

    } catch (error) {
        console.error("error", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message,
        });
    }
}

exports.changePassword = async (req, res) => {
    try {
        // Get user ID from req.user
        const id = req.user.id;

        // Find the user by ID
        const user = await User.findById(id);
        console.log("user",user);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Get old password and new password from req.body
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        // Debugging: Log passwords to ensure they are defined
        console.log("Old Password:", oldPassword);
        console.log("User Password:", user.password);
        console.log("New Password:", newPassword);

        // Check if oldPassword is provided
        if (!oldPassword) {
            return res.status(400).json({
                success: false,
                message: "Old password is required",
            });
        }

        // Validate old password
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            // If old password does not match, return a 401 (Unauthorized) error
            return res.status(401).json({ 
                success: false, 
                message: "The old password is incorrect" 
            });
        }

        // Match new password and confirm new password
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm new password do not match",
            });
        }

        // Update password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        user.password = encryptedPassword;
        await user.save();

        // Send notification email
        try {
            const emailResponse = await mailSender(
                user.email,
                "Password Updated",
                `Password updated successfully for ${user.firstName} ${user.lastName}`
            );
            console.log("Email sent successfully:", emailResponse.response);
        } catch (error) {
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });

    } catch (error) {
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
};


// delete profile

exports.deleteProfile = async (req, res) => {

    try {
        const id= req.user.id;
        //validation
        const user = await User.findById({ _id: id });
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
        // Delete Assosiated Profile with the User
        await Profile.findByIdAndDelete({ _id: user.additionalDetails });
        // Now Delete User
        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({
          success: true,
          message: "User deleted successfully",
        });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "User Cannot be deleted successfully" });
      }
    }

// get all user details

exports.getAllUserDetails = async (req, res) => {

    try {
        const id= req.user.id;
        //validation
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        //send response
        return res.status(200).json({
            success:true,
            message:"user details fetched successfully",
            data:userDetails
        })

    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success:false,
            message:"failed to fetch user details",
            error:error.message
        })
    }
}


// get all the workspaces of the youtuber

exports.getWorkSpace = async(req,res)=>{
    try {
        const userId = req.user.id
        const userDetails= await User.findOne({
            _id :userId,
        }).populate("workspaces").exec();

        if(!userDetails)
            return res.status(400).json({
            success:false,
            message:`Could not fiind the user  with id : ${userDetails}`,
        })
        return res.status(200).json({
            success:true,
            data:userDetails.workspaces
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}