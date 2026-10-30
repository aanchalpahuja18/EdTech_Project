const mongoose = require("mongoose");

const subSectionSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String
    },
    timeDuration: {
        type: String
    },
    videoUrl: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("SubSection", subSectionSchema);