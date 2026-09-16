const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    gender: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
    about: {
        type: String
    },
    profession: {
        type: String,
        enum: ["Developer", "Student", "Professional", "Learner"]
    }
})

module.exports = mongoose.model("Profile", profileSchema);