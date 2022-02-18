const Subpremiumcategory = require("../Models/subpremiumcategoryModel");

module.exports.addSubpremiumCategory = ("/", async (req, res) => {
    const newSubCategory = await new Subpremiumcategory({
        subcategorypremiumname: req.body.subcategorypremiumname,
        subcategorypremiumimage: req.file.path
    });
    try {
        //generate bcrpyt password
        const subcategory = await newSubCategory.save();
        res.status(201).json({
            message: "Sub Premium Category Addedd Successfully",
            data: subcategory
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})


//Edit Product code

module.exports.editsubpremiumCategory = ("/:id", async (req, res) => {
    var id = req.params.id
    var subcategory_image = req.file.path
    var category_name = req.body.subcategorypremiumname

    Subpremiumcategory.findById(id, function (err, data) {
        data.categoryimage = subcategory_image ? subcategory_image : data.categoryimage;
        data.subcategorypremiumname = category_name ? category_name : data.subcategorypremiumname;
        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "Sub Premium Category Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });

})


//DELETE PRODUCT
module.exports.deletesubpremiumcategory = ("/:id", async (req, res) => {
    try {
        await Subpremiumcategory.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Sub Premium Category Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
});

//GET SINGLE PRODUCT BY USERS AND ADMIN
module.exports.getsubpremiumcategorybyid = ("/:id", async (req, res) => {
    try {
        const singlesubpremiumCategory = await Subpremiumcategory.findById(req.params.id)
        res.status(200).json({
            message: "success",
            data: singlesubpremiumCategory
        })

    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
})

//GET ALL CATEGPRIES
module.exports.getallsubpremiumcategory = ("/", async (req, res) => {
    try {
        const allsubpremiumcategories = await Subpremiumcategory.find();
        res.status(200).json({
            message: "success",
            data: allsubpremiumcategories
        });
    } catch (err) {
        res.status(500).json({ error: "Something went Wrong" })
    }
})

