const Section = require("../models/Section");
const Course = require("../models/Course");

//createSchema:
async function createSection(req, res) {
    try{
        //fetch data:
        const {sectionName, courseId} = req.body;

        //validate the data:
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the required fields"
            })
        }

        //create section:
        const newSection = await Section.create({sectionName});
        console.log("New section created:", newSection);

        //update the section id in course: 
        const updatedCourse = await Course.findByIdAndUpdate(courseId, 
            {
                $push: {
                    courseContent: newSection._id
                }
            }, {new: true});

        //TODO: Use populate to replace section and subSection both in the updatedCourse
        console.log("Course is updated with section: ", updatedCourse);

        //return res
        return res.status(200).json({
            success: true,
            message: "Section is created successfully!",
            updatedCourse
        })
    } catch(err){
        console.log("error in creating section");
        return res.status(500).json({
            success: false,
            message: "Error in creating a section",
            error: err.message
        })
    }
}

//update Section:
async function updateSection(req, res) {
    try {
        //fetch data:
        const {sectionName, sectionId} = req.body;
    
        //validate the data:
        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the required fields"
            })
        }

        //update entry of section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            sectionName: sectionName
        }, {new: true});
        console.log("Section is updated:", updatedSection);

        //return res:
        return res.status(200).json({
            success: true,
            message: "Section is updated successfully!"
        })
    } catch (error) {
        console.log("error in updating section");
        return res.status(500).json({
            success: false,
            message: "Error in updating a section"
        })
    }
}

//remove Section:
async function removeSection(req, res) {
    try{
        //fetch data -> assuming that we are sending id in params:
        const {sectionId, courseId} = req.body;
    
        //validate the data:
        if(!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the required fields"
            })
        }

        //remove entry from section:
        const removedSection = await Section.findByIdAndDelete(sectionId);
        console.log("Removed section: ", removedSection);

        //remove entry from course:
        const removedFromCourse = await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId
            }
        }, {new: true});
        console.log("Removed section from course: ", removedFromCourse);

        //return res:
        return res.status(200).json({
            success: true,
            message: "Section is deleted successfully!"
        })

    } catch(err){
        console.log("error in removing section");
        return res.status(500).json({
            success: false,
            message: "Error in removing a section"
        })
    }
}


module.exports = {createSection, updateSection, removeSection}