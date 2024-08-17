const User = require('../models/User');
const Profile = require('../models/Profile');
const dotenv = require('dotenv');

exports.updateProfile = async (req, res) => {

    try {
         
        // data fetch
        const{dateOfBirth="", contactNumber, about=""} = req.body;
        //fetch user id
        const id = req.user._id;
    
        //validation
        if(!about || !dateOfBirth){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //find profile
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);
        if(!profile){
            return res.status(404).json({
                success:false,
                message:"Profile not found"
            })
        }
        // Update the profile fields
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;

        // Save the updated profile
        await profile.save();

        //send response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data:profile
        })

    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            success:false,
            message:"failed to update profile",
            error:error.message
        })
    }
}

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