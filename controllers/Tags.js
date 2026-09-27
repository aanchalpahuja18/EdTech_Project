const Tag = require("../models/Category");  


//createTag:

async function createTag(req, res) {
    try{
        //fetch name and desc from req body:
        const {name, description} = req.body;

        //validate name & desc:
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "Please enter the required fields!"
            })
        }

        //create an entry in DB:
        const newTag = await Tag.create({name: name, description: description});
        console.log("New tag created: ", newTag);


        //return response:
        return res.status(200).json({
            success: true,
            message: "Tag created successfully!"
        })
    } catch(err){
        console.log("Error in creating tag:", err);
        return res.status(500).json({
            success: false,
            message: "Error in creating the tag, please try again"
        })
    }
}

//getTags:

async function getAllTags(req, res) {
    try {
        //fetch the tags from DB;

        //find without any criteria, bring all the entries from DB but make sure that name and description should be present in the tags which you are bringing
        const tags = await Tag.find({}, {name: true, description: true});
        console.log("Tags stored in DB: ", tags);

        return res.status(200).json({
            success: true,
            message: "All tags returned successfully!",
            tags
        })
    } catch (err) {
        console.log("Error while fetching the tags:", err);
        return res.status(500).json({
            success: false,
            message: "Error while fetching the tags."
        })
    }
}

module.exports = {createTag, getAllTags};