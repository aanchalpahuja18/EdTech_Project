const User = require("../models/User");
const sendMail = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//reset password token:

async function resetPasswordToken(req, res) {
    try{
        //fetch email from req body
        const email = req.body.email;

        //validate email:
        if(!email) {
            return res.status(401).json({
                success: false,
                message: "Please enter the required fields"
            })
        }

        //check if user exists:
        const user = await User.findOne({email});
        if(!user){
            return res.status(500).json({
                success: false,
                message: "You are not registered with us!"
            })
        }

        //generate a token:
        const token = crypto.randomUUID();
        console.log("Token value: ", token);

        //add token and expiry time inside the User model
        const updatedDetails = await User.findOneByIdAndUpdate({email: email}, {
            token: token,
            resetPasswordExpiryTime: Date.now() + 5*60*1000
        }, {new: true});
        console.log("Updated user is: ", updatedDetails);

        //create url:
        const url = `http://localhost:3000/reset-password/${token}`;

        //send mail containing the url:
        await sendMail(email, "Reset Password Link", `Reset your password using the given link: ${url}`);

        //return response: 
        return res.status(200).json({
            success: true,
            message: "Your password is reset successfully!"
        })
    } catch(err){ 
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again"
        })
    }
}

async function resetPassword(req, res) {
    try{
        //fetch details:
        //with the help of token, we will fetch the userDetails
        const {token, password, confirmPassword} = req.body;

        //validate:
        if(!token || !password || !confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Please fill all the required fields!"
            })
        }

        //check if passwords match:
        if(password !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "Passwords do not match, please try again"
            })
        }

        //fetch userDetails with the help of token:
        const userDetails = await User.findOne({token: token});
        console.log("User details: ", userDetails);

        //if no entry -> invalid token
        if(!userDetails){
            return res.status(500).json({
                success: false,
                message: "Token is invalid!"
            })
        }

        //token time check
        if(userDetails.resetPasswordExpiryTime < Date.now()){
            return res.status(500).json({
                success: false,
                message: "Your token is expired, please try again"
            })
        }

        //hash password:
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(confirmPassword, 10);
        } catch(err){
            return res.status(500).json({
                success: false,
                message: "Failure in hashing the password"
            })
        }

        //update the password in DB:
        const updatedPassword = await User.findOneAndUpdate({token: token}, {password: hashedPassword}, {new: true});
        console.log("Updated password entry: ", updatedPassword);

        //return response:
        return res.status(200).json({
            success: true,
            message: "Password reset is successful!"
        })

    } catch(err) {
        console.log("Error while reseting the password");
        return res.status(500).json({
            success: false,
            message: "Error in reseting the pwd, please try again later"
        })
    }
}

module.exports = {resetPasswordToken, resetPassword};