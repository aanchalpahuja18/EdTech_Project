const User = require("../models/User");
const Profile = require("../models/Profile");


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
        const user = await User.find({_id: userId});

        //find profile:
        const profileId = user.additionalDetails;

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