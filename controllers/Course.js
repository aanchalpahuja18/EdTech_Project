const Course = require("../models/Course");
const Tag = require("../models/Tags");
const User = require("../models/User");
const uploadImageToCloudinary = require("../utils/imageUploader");

require("dotenv").config();


//createCourse handler function:
async function createCourse(req, res) {
    try{
        //fetch data:
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;

        //fetch file:
        const thumbnail = req.files.image;

        //validate the data:
        if(!courseName || !courseDescription || whatYouWillLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the required fields"
            })
        }

        //TODO: verify that userID and instructorDetails._id are same or different?
        //check for instructor:
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor details:", instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor details not found"
            })
        }

        //check given tag is valid or not
        const checkTags = await Tag.findById(tag);
        if(!checkTags){
            return res.status(404).json({
                success: false,
                message: "Tag details not found"
            })
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        console.log("Image uploaded to cloudinary:", response);


        //create an entry for new course
        const courseData = {
            courseName, 
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag: checkTags._id,
            thumbnail: thumbnailImage.secure_url
        }
        const newCourse = await Course.create(courseData);
        console.log("Course added in DB: ", newCourse)


        
        //add course to the user model of instructor
        const courseUser = await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    course: newCourse._id
                }
            },
            {new: true}
        );
        console.log("Course added in User model: ", courseUser);

        //update the tag schema
        const courseTag = await Tag.findByIdAndUpdate(
            {_id: checkTags._id},
            {
                $push: {
                    course: newCourse._id
                }
            },
            {new: true}
        );
        console.log("Course added in Tag model: ", courseTag);

        return res.status(200).json({
            success: true,
            message: "Course created successfully!",
            data: newCourse
        })

    } catch(err){
        console.log("Error in creating the course");
        return res.status(500).json({
            success: false,
            message: "Error in creating the course, please try again later",
            error: error.message
        })
    }
}


//getAllCourses:

async function getAllCourses(req, res){
    try {
        //fetch all the courses from DB:
        // const courses = await Course.find({}, {courseName: true, price: true, thumbnail: true, instructor: true, ratingsAndReview: true, studentsEnrolled: true}).populate("instructor").exec();

        const courses = await Course.find({});
        console.log("All the courses are:", courses);

        return res.status(200).json({
            success: true,
            message: "Courses are fetched successfully!",
            data: courses
        })
    } catch (error) {
        console.log("Error in fetching all the course");
        return res.status(500).json({
            success: false,
            message: "Error in fetching all the course, please try again later",
            error: error.message
        })
    }   
}

module.exports = {createCourse, getAllCourses}