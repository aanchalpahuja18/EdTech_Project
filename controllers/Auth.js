const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator")
const bcrypt = require("bcrypt");


//sendOTP:
async function sendOTP(req, res) {
    try {
        //fetch email from req body
        const email = req.body;
    
        if(!email){
            return res.status(500).json({
                success: false,
                message: "Please enter a valid email!"
            })
        }
        
        //check if user already exists
        const emailExists = await User.findOne({email});
    
        //if user already exists, then return response
        if(emailExists) {
            return res.status(401).json({
                success: false,
                message: "User already registered!"
            })
        }

        //generate otp:
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        console.log("Otp generated: ", otp);

        //check unique otp?
        let result = await OTP.findOne({otp: otp});

        while(result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
            result = await OTP.findOne({otp: otp})
        }

        //create an otp payload
        const otpPayload = {
            email, 
            otp
        };

        //create a new entry in the OTP schema
        const newOtp = await OTP.create(otpPayload);

        console.log(newOtp);

        //return response successfully!
        return res.status(200).json({
            success: true,
            message: "OTP generated successfully!",
            otp
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Failure in generating the OTP"
        })
    }
}

//signup function: 



module.exports = {sendOTP, signup}