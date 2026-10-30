const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");


//createRating:
async function createRating(req, res) {
    try{
        //get user id:
        const userId = req.user.id;
        //fetch data from req body:
        const {courseId, rating, review} = req.body;

        //validate
        if(!userId || !courseId || !rating || !review) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the required fields"
            })
        }

        //check if user is enrolled or not
        const courseDetails = await Course.findOne({_id: courseId,
            studentsEnrolled: {$elemMatch: {$eq: userId}},
        });

        if(!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course"
            })
        }

        //check if user has already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId
        })

        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: "Course is already reviewed by the user"
            })
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create({
            ratings: rating,
            review: review,
            user: userId,
            course: courseId
        })

        //attach it with course
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id: courseId}, 
            {
                $push: {
                    ratingAndReview: ratingReview._id
                }
        }, {new: true});

        console.log(updatedCourseDetails);

        //return response
        return res.status(200).json({
            success: true,
            message: "Rating and review created successfully",
            ratingReview
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to create rating and review, please try again"
        })
    }
}


//getAverageRating:
async function getAverageRating(req, res) {
    try{
        //get course id:
        const {courseId} = req.body;

        //calculate avg rating: 
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new momgoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: {
                        $avg: "$rating"
                    }
                }
            }
        ])

        //return response
        if(result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating
            })
        }

        //if no rating/review exists:
        return res.status(200).json({
            success: true,
            message: "Average rating is 0, no ratings given by user till now",
            averageRating: 0
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to create rating and review, please try again"
        })
    }
}



//getAllRating and review:

async function getAllRatings(req, res) {
    try{
        const allRatingsReviews = await RatingAndReview.find({})
        .sort({rating: "desc"})
        .populate({
            path: "user",
            select: "firstName lastName image"
        })
        .populate({
            path: "course",
            select: "courseName"
        })
        .exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully!",
            data: allRatingsReviews
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to create rating and review, please try again"
        })
    }
}

//getCourseRating

async function getCourseRatings(req, res) {
    try{

        //get course id:
        const {courseId} = req.body;

        //validate courseId:
        if(!courseId) {
            return res.status(400).json({
                success: false,
                message: "Please provide the course id"
            })
        }

        //fetch all the ratings and reviews for the course:
        const ratingsReviews = await RatingAndReview.find({course: courseId});

        if(!ratingsReviews){
            return res.status(400).json({
                success: false,
                message: "No ratings and reviews found for the course"
            })
        }

        //return response with ratings and reviews:
        return res.status(200).json({
            success: true,
            message: "Ratings and reviews fetched successfully!",
            data: ratingsReviews
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to get ratings for the course, please try again"
        })
    }
}

module.exports = {createRating, getAverageRating, getAllRatings, getCourseRatings}