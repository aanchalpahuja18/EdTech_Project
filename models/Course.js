const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    courseName: {
        type: String,
        required:true,
        trim: true
    },
    courseDescription: {
        type: String,
        required:true,
        trim: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    whatYouWillLearn: {
        type: String,
        required: true
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
            required: true
        }
    ],
    ratingAndReview: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview"
        }
    ],
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String, 
        required: true
    },
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Category"
        }
    ],
    tag: {
        type: String, 
        required: true
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    ],
})

module.exports = mongoose.model("Course", courseSchema);