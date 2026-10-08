const mongoose = require("mongoose");

require("dotenv").config();
function dbConnect(){
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("DB connected successfully!")
    })
    .catch((err) => {
        console.log("Error in connecting DB")
        console.error(err);
        process.exit(1);
    })
}

module.exports = dbConnect;