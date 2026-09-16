const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
    tagName: {
        type: String,
        required:true
    },
    description: {
        type: String
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }
})

module.exports = mongoose.model("Tag", tagSchema);