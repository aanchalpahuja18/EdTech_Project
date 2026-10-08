const User = require("../models/User");
const Profile = require("../models/Profile");
const Course = require("../models/Course");
const imageUploader = require("../utils/imageUploader");


//update profile:
async function updateProfile(req, res) {
    try{
        //fetch data:
        const {gender, dateOfBirth="", about="", contactNumber} = req.body;
        //get user id
        const userId = req.user.id;
        
        //validate:
        if(!gender || !contactNumber || !userId){
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }

        //find user:
        const user = await User.findById(userId);

        //find profile:
        const profileId = user.additionalDetails;

        //TODO: check the below code in testing:
        // const profileDetails = await Profile.findById(profileId);

        // profileDetails.gender = gender;
        // profileDetails.contactNumber = contactNumber;
        // profileDetails.about = about;
        // profileDetails.dateOfBirth = dateOfBirth;

        // await profileDetails.save();

        //update profile:
        const updatedProfile = await Profile.findByIdAndUpdate({_id: profileId}, {
            gender,
            dateOfBirth,
            about,
            contactNumber
        }, {new: true});
        console.log("Updated profile: ", updatedProfile);

        //return res:
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully!",
            updatedProfile
        })

    } catch(err) {
        console.log("Error while updating the profile");
        return res.status(500).json({
            success: false,
            message: "Error while updating the profile"
        })
    }
}

//TODO: add a function to update the profile picture of the user:


//deleteAccount:
async function deleteAccount(req, res) {
    try{
        //get user id
        const userId = req.user.id;
        console.log("User id: ", userId);
        //validation
        const userDetails = await User.findById(userId);
        console.log("User details: ", userDetails);

        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        
        //TODO - HW: unenroll user from all enrolled courses.
        if(req.user.accountType === "Student"){
            //fetch courses in which user is enrolled:
            const courses = userDetails.courses;
            for(let i=0;i<courses.length;i++){
                await Course.findByIdAndUpdate({_id: courses[i]._id}, {
                    $pull: {
                        studentsEnrolled: userId
                    }
                }, {new: true})
            }
        }

        //TODO: find out how can we schedule the deletion of the account after 5 days

        //TODO: what is a cron job?
        //delete profile
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});
        //delete user
        await User.findByIdAndDelete({_id: userId});
        //return response
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully!"
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to delete your account, please try again later"
        })
    }
}

async function getUserDetails(req, res) {
    try{
        //get user id
        const userId = req.user.id;

        //get user details
        const userDetails = await User.findById({_id: userId}).populate("additionalDetails").exec();

        //validation
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //return res:
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully!",
            data: userDetails
        })

    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to fetch the user details"
        })
    }
}

async function updateProfileImage(req, res) {
    try{   
        //fetch image:
        const profileImage = req.files.image;
        console.log("Profile image: ", profileImage);

        //fetch user id:
        const userId = req.user.id;
        console.log("User id: ", userId);

        //validate:
        if(!profileImage){
            return res.status(400).json({
                success: false,
                message: "Please attach the profile image"
            })
        }

        //upload image to cloudinary:
        const response = await imageUploader(profileImage, "EdTech/ProfileImages");
        console.log("Profile image uploaded to cloudinary: ", response);

        // check if user exists, yes then find the id and update the profile image:
        const updatedProfile = await User.findByIdAndUpdate({_id: userId}, {
            image: response.secure_url
        }, {new: true});

        console.log("Updated profile: ", updatedProfile);

        if(!updatedProfile){
            return res.status(500).json({
                success: false,
                message: "User is not registered with us, please signup to continue"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Profile image updated successfully!",
            data: updatedProfile
        })
 
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failure in updating the profile picture, please try again"
        })
    }
}

module.exports = {updateProfile, deleteAccount, getUserDetails, updateProfileImage};