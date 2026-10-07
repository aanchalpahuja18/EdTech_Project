const express = require("express");

const router = express.Router();

const {createCategory, getAllCategories, categoryPageDetails} = require("../controllers/Categories");
const {contact} = require("../controllers/ContactUs");
const {createCourse, getAllCourses, getCourseDetails} = require("../controllers/Course");
const {updateProfile, deleteAccount, getUserDetails} = require("../controllers/Profile");
const {createRating, getAverageRating, getAllRatings, getCourseRatings} = require("../controllers/RatingAndReview");
const {createSection, updateSection, removeSection} = require("../controllers/Section");
const {createSubsection, updateSubsection, removeSubsection} = require("../controllers/Subsection");

//Categories routes:

router.post("/create-category", createCategory);
router.get("/get-all-categories", getAllCategories);
router.get("/category-page-details", categoryPageDetails);

//Contact route:
router.post("/contact-us", contact);

//Course route:
router.post("/create-course", createCourse);
router.get("/get-all-courses", getAllCourses);
router.get("/get-course-details", getCourseDetails);

//Profile route:
router.put("/update-profile", updateProfile);
router.delete("/delete-account", deleteAccount);
router.get("/get-user-details", getUserDetails);

//Rating and review route:
router.post("/create-rating", createRating);
router.get("/get-average-rating", getAverageRating);
router.get("/get-all-ratings", getAllRatings);
router.get("/get-course-ratings", getCourseRatings);


//Section route:
router.post("/create-section", createSection);
router.put("/update-section", updateSection);
router.delete("/remove-section", removeSection);

//Subsection route:
router.post("/create-sub-section", createSubsection);
router.put("/update-sub-section", updateSubsection);
router.delete("/delete-sub-section", removeSubsection);

module.exports = router;