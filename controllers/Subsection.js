const Section = require("../models/Section");
const SubSection = require("../models/Subsection");
const uploadImageToCloudinary = require("../utils/imageUploader");

require("dotenv").config();
//create sub section:

async function createSubsection(req, res) {
    try{
        //fetch data:
        const {sectionId, title, description, timeDuration} = req.body;

        //fetch video file:
        const video = req.files.videoFile;

        //validate data:
        if(!sectionId || !title || !description || !timeDuration || !video) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }

        //upload video to cloudinary:
        const response = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        if(!response){
            return res.status(500).json({
                success: false,
                message: "Failed to upload video file to cloudinary, please try again later"
            })
        }
        const videoUrl = response.secure_url;

        //create a subsection:
        const newSubsection = await SubSection.create({
            title, description, timeDuration, videoUrl
        });
        console.log("New subsection created: ", newSubsection);

        //create an entry of new subsection id in section:
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId}, {
            $push: {
                subSection: newSubsection._id
            }
        }, {new: true});
        //TODO: log updated section here after adding populate query
        console.log("Section is updated with subsection:", updatedSection);

        //return res:
        return res.status(200).json({
            success: true,
            message: "Sub section is created successfully!",
            updatedSection
        })

    } catch(err) {
        console.log("Error in creating a subsection:", createSubsection);
        return res.status(500).json({
            success: false,
            message: "Error in creating a subsection",
        })
    }
}

//update sub section:
async function updateSubsection(req, res) {
    try{
        //fetch data:
        const {subSectionId, title, description, timeDuration} = req.body;

        //fetch video:
        const video = req.files.file;

        //validate data:
        if(!subSectionId || !title || !description || !timeDuration || !video) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }

        //upload new video to cloudinary:
        const response = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        if(!response){
            return res.status(500).json({
                success: false,
                message: "Failed to upload video to cloudinary, please try again later."
            })
        }

        const videoUrl = response.secure_url;

        //update in section:
        const updatedSubsection = await SubSection.findByIdAndUpdate(subSectionId, {
            title, description, timeDuration, videoUrl
        }, {new: true});
        console.log("Updated the subsection: ", updatedSubsection);

        //return res:
        return res.status(200).json({
            success: true,
            message: "Sub section updated successfully!"
        })

    } catch(err) {
        console.log("Error in updating a subsection:", createSubsection);
        return res.status(500).json({
            success: false,
            message: "Error in updating a subsection"
        })
    }
}

//remove sub section:
async function removeSubsection(req, res) {
    try{
        //fetch data:
        const {subSectionId, sectionId} = req.params;

        //validate data:
        if(!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }

        //remove subsection:
        await SubSection.findByIdAndDelete(subSectionId);

        //remove from section:
        await Section.findByIdAndUpdate(sectionId, {
            $pull: {
                subSection: subSectionId
            }
        })

        //return res:
        return res.status(200).json({
            success: true,
            message: "Sub section removed successfully!"
        })

    } catch(err){
        console.log("Error in removing a subsection:", createSubsection);
        return res.status(500).json({
            success: false,
            message: "Error in removing a subsection"
        })
    }
}

module.exports = {createSubsection, updateSubsection, removeSubsection};