const Category = require("../models/Category");  


//createCategory:

async function createCategory(req, res) {
    try{
        //fetch name and desc from req body:
        const {name, description} = req.body;

        //validate name & desc:
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "Please enter the required fields!"
            })
        }

        //create an entry in DB:
        const newCategory = await Category.create({categoryName: name, description: description});
        console.log("New category created: ", newCategory);


        //return response:
        return res.status(200).json({
            success: true,
            message: "Category created successfully!"
        })
    } catch(err){
        console.log("Error in creating category:", err);
        return res.status(500).json({
            success: false,
            message: "Error in creating the category, please try again"
        })
    }
}

//getCategory:

async function getAllCategories(req, res) {
    try {
        //fetch the categories from DB;

        //find without any criteria, bring all the entries from DB but make sure that name and description should be present in the categories which you are bringing
        const categories = await Category.find({}, {name: true, description: true});
        console.log("Categories stored in DB: ", categories);

        return res.status(200).json({
            success: true,
            message: "All categories returned successfully!",
            categories
        })
    } catch (err) {
        console.log("Error while fetching the categories:", err);
        return res.status(500).json({
            success: false,
            message: "Error while fetching the categories."
        })
    }
}

//categoryPageDetails:

async function categoryPageDetails(req, res) {
    try{
        //get category Id:
        const {categoryId} = req.body;

        //get courses for specified categoryId:
        const selectedCategory = await Category.findById(categoryId)
                                                .populate("courses")
                                                .exec();

        //validation:
        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message: "Data not found"
            })
        }

        //get courses for different categories:
        const differentCategories = await Category.find({
            _id: {$ne: categoryId},
        })
        .populate("courses")
        .exec();

        //get top 10 selling courses:
        //TODO: write it on your own -> will complete it while testing
        const allCategories = await Category.findById({_id: categoryId});


        //return response:
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories
            }
        })


    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }   
}


module.exports = {createCategory, getAllCategories, categoryPageDetails};