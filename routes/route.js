const express = require("express");

const router = express.Router();

const {createCategory, getAllCategories, categoryPageDetails} = require("../controllers/Categories");
const {contact} = require("../controllers/ContactUs");
const {createCourse, getAllCourses, getCourseDetails} = require("../controllers/Course");
const {updateProfile, deleteAccount, getUserDetails, updateProfileImage} = require("../controllers/Profile");
const {createRating, getAverageRating, getAllRatings, getCourseRatings} = require("../controllers/RatingAndReview");
const {createSection, updateSection, removeSection} = require("../controllers/Section");
const {createSubsection, updateSubsection, removeSubsection} = require("../controllers/Subsection");
const {capturePayment, verifySignature} = require("../controllers/Payments");
const {sendOTP, signup, login, changePassword} = require("../controllers/Auth");
const {resetPasswordToken, resetPassword} = require("../controllers/ResetPassword");

//import middlewares: 
const {auth, isStudent, isInstructor, isAdmin} = require("../middlewares/auth");

//Auth route:
router.post("/login", login);
router.post("/signup", signup);
router.post("/send-otp", sendOTP);
router.post("/change-password", auth, changePassword);

//Reset password route:
router.post("/reset-password-token", resetPasswordToken );
router.post("/reset-password", resetPassword);


//Payments route:
router.post("/capture-payment", auth, isStudent, capturePayment);
router.post("/verify-signature", verifySignature);

//Categories routes:

router.post("/create-category", auth, isAdmin, createCategory);
router.get("/get-all-categories", getAllCategories);
router.get("/category-page-details", categoryPageDetails);

//Contact route:
router.post("/contact-us", contact);

//Course route:
router.post("/create-course", auth, isInstructor, createCourse);
router.get("/get-all-courses", getAllCourses);
router.post("/get-course-details", getCourseDetails);

//Profile route:
router.put("/update-profile", auth, updateProfile);
router.delete("/delete-account", auth, deleteAccount);
router.get("/get-user-details", auth, getUserDetails);
router.put("/update-profile-image", auth, updateProfileImage);

//Rating and review route:
router.post("/create-rating", auth, isStudent, createRating);
router.get("/get-average-rating", getAverageRating);
router.get("/get-all-ratings", getAllRatings);
router.get("/get-course-ratings", getCourseRatings);


//Section route:
router.post("/create-section", auth, isInstructor, createSection);
router.put("/update-section", auth, isInstructor, updateSection);
router.delete("/delete-section",  auth, isInstructor, removeSection);

//Subsection route:
router.post("/create-sub-section", auth, isInstructor,  createSubsection);
router.put("/update-sub-section",  auth, isInstructor,  updateSubsection);
router.delete("/delete-sub-section",  auth, isInstructor, removeSubsection);

module.exports = router;