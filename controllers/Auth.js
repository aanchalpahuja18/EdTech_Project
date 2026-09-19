const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator")
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");

require("dotenv").config();


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

async function signup(req, res) {
    try {
        //data fetch from request body
        const {firstName, lastName, accountType, email, contactNo, password, confirmPassword, otp} = req.body;

        //validate all the fields
        if(!firstName || !lastName || !email || !contactNo || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "Please fill all the fields!"
            })
        }

        //match both the passwords
        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match, please try again!"
            })
        }

        //check existing email
        const emailExists = await User.findOne(email);
        if(emailExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists!"
            })
        }


        //find the otp
        const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log("Recent OTP: ", recentOtp);

        if(recentOtp.length === 0 ){
            return res.status(400).json({
                success: false,
                message: "OTP not found!"
            })
        } else if(otp !== recentOtp.otp){
            //Invalid OTP
            return res.status(400).json({
                success: false,
                message: "OTP does not match, Please try again"
            })
        }

        // await sendVerificationMail(email, otp);

        //hash password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(confirmPassword, 10);
        }
        catch(err){
            return res.status(5090).json({
                success: false,
                message: "Error in hashing the password!"
            })
        }

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            profession: null
        })
        //create entry in DB
        const userData = {
            firstName,
            lastName,
            email,
            contactNo,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        }

        const newUser = await User.create(userData)

        //return response
        return res.status(200).json({
            success: true,
            message: "User registered successfully!",
            newUser
        })

    } catch (error) {
        console.log("Error while registering the user: ", error);
        return res.status(500).json({
            success: false,
            message: "Failure in registering the user"
        })
    }
}


//login flow:
async function login(req, res) {
    try{
        //fetch email and password: 
        const {email, password} = req.body;

        //validate: 
        if(!email || !password) {
            return res.status(403).json({
                success: false,
                message: "Please enter all the required fields!"
            })
        }

        //check if email exists: 
        const checkEmail = await User.find({email});

        if(!checkEmail){
            return res.status(400).json({
                success: false,
                message: "Please register yourself!"
            })
        }

        //check if password matches:
        const checkPassword = await User.find({email, password});

        if(checkPassword !== password) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }

        const tokenPayload = {
            email,
            password
        }

        const jwtSecret = process.env.JWT_SECRET;

        const token = jwt.sign(tokenPayload, jwtSecret, {expiresIn: "2h"} );

        return res.status(200).json({
            success: true,
            message: "User is logged in"
        })
    } catch(err) {
        console.log("Error", err);
        return res.status(500).json({
            success: false,
            message: "Failure in logging in the user"
        })
    }
}



module.exports = {sendOTP, signup, login}