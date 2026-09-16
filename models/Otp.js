const mongoose = require("mongoose");
const sendMail = require("../utils/mailsender");

const otpSchema = mongoose.Schema({
    email: {
        type: String,
        required:true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
        expires: 5*60
    }
})

async function sendVerificationMail(email, otp) {
    try{
        const mailResponse = await sendMail(email, "Verification Email from EdTech", otp);
        console.log("Email sent successfully!", mailResponse);
    }catch(err){
        console.log("Error while sending verification mail", err);
        throw err;
    }
}

otpSchema.pre("save", async function(next) {
    await sendVerificationMail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", otpSchema);