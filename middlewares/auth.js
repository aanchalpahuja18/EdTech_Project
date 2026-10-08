require("dotenv").config();
const jwt = require("jsonwebtoken");

//auth:

async function auth(req, res, next) {
    try{
        //fetch token: 

        const token = req.cookies.token || req.body.token || req.headers("Authorisation").replace("Bearer ", "");
        console.log("Token fetched from the request: ", token);
        //validate the token:
        if(!token) {
            return res.status(403).json({
                success: false,
                message: "Token is missing!"
            })
        }

        //verifying the token:
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoding the token:", decode);

            req.user = decode;

        } catch(err) {
            console.log("Token is missing");
            return res.status(500).json({
            success: false,
            message: "Token is missing!"
        })
        }
    } catch(err) {
        console.log("Error in auth middleware: ", err);
        return res.status(500).json({
            success: false,
            message: "Validation of token failed!"
        })
    }
    next();
}


//isStudent:
async function isStudent(req, res, next) {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students"
            })
        }
    } catch(err) {
        console.log("Error in auth middleware: ", err);
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again!"
        })
    }

    next();
}

//isInstructor
async function isInstructor(req, res, next) {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor"
            })
        }
    } catch(err) {
        console.log("Error in auth middleware: ", err);
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again!"
        })
    }
    next();
}

//isAdmin
async function isAdmin(req, res, next) {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin"
            })
        }
    } catch(err) {
        console.log("Error in auth middleware: ", err);
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again!"
        })
    }
    next();
}

module.exports = {auth, isStudent, isInstructor, isAdmin};