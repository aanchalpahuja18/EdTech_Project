const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/template/courseEnrollment");

//capture the payment and initiate the razorpay order:

async function capturePayment(req, res) {
    try{
        //fetch ids:
        const {courseId} = req.body;
        const userId = req.user.id;

        //validate:
        //valid course id
        if(!courseId) {
            return res.status(404).json({
                success: false,
                message: "Please enter valid course id"
            })
        }

        //valid course detail
        let course;
        try{
            course = await Course.findById(courseId);
            if(!course) {
                return res.status(500).json({
                    success: false,
                    message: "Could not find the course"
                })
            }

            //user already pay for the same course:
            const uid = new mongoose.Types.ObjectId(userId);

            if(course.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success: false,     
                    message: "Student is already enrolled"
                })
            }

        } catch(err){
            console.log(err);
            return res.status(500).json({
                    success: false,
                    message: err.message
            })
        }

        //order create
        const amount = course.price;
        const currency = "INR";
        const options = {
            amount: amount*100,
            currency: currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: courseId,
                userId: userId
            }
        }
        
        try {
            //initate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log("Payment response:", paymentResponse); 

            return res.status(200).json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                success: false,
                message: "Could not initate the order",
            })
        }

    } catch(err) {
        console.log("Error while capturing the payment:", err);
        return res.status(500).json({
            success: false,
            message: "Payment captured failed!"
        })
    }
}

//verify signature:

async function verifySignature(req, res) {
    try {
        //server vala signature
        const webhookSecret = "12345678";

        //razorpay ka bheja hua signature
        const signature = req.headers["x-razorpay-signature"];

        //converting webhook into encrypted format:
        const shasum = crypto.createHmac("sha256", webhookSecret);
        shasum.update(JSON.stringify(req.body));

        //output of converting a string into a encrypted format gives us hex number which is also known as digest
        const digest = shasum.digest("hex");

        if(signature === digest){
            console.log("Payment is authorized");

            const {courseId, userId} = req.body.payload.payment.entity.notes;

            try{
                //fulfill the action items:

                //find the course and enroll the student in it:
                const enrolledCourse = await Course.findOneAndUpdate(
                    {_id: courseId},
                    {
                        $push: {
                        studentsEnrolled: userId
                    }},
                    {new: true} 
                ); 

                if(!enrolledCourse){
                    return res.status(500).json({
                        success: false,
                        message: "Course not found"
                    })
                }

                console.log(enrolledCourse);

                //find the student and add the course to their list of enrolled courses:
                const enrolledStudent = await User.findOneAndUpdate({_id: userId}, {
                    $push: {
                        course: courseId
                    }
                }, {new: true}) 

                console.log(enrolledStudent);

                //send confirmation mail:
                const emailResponse = await mailSender(enrolledStudent.email, "Congratulations from EdTech", "Congratulations, you are onboarded into new course", )

                console.log(emailResponse);
                return res.status(200).json({
                    success: true,
                    message: "Signature verified & Course added successfully!"
                })
            
            } catch(err){
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
        }

        return res.status(400).json({
            success: false,
            message: "Invalid request"
        })


    } catch (error) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


module.exports = {capturePayment, verifySignature};