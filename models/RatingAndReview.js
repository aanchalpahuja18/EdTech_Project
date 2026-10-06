const mongoose = require("mongoose");

const ratingAndReviewSchema = mongoose.Schema({
    ratings: {
        type: Number,
        required:true
    },
    review: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
        index: true
    }
})

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);