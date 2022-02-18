const Subcategory = require("../Models/subcategoryModel")
const Category = require("../Models/categoryModel")




module.exports.addSubCategory = async (req, res) => {
    var { categoryId, subcategoryname } = req.body
    if (categoryId == '') {
        res.status(500).json({
            status: "Failed",
            message: "Catgory Id Is Required"
        })
    } else if (subcategoryname == '') {
        res.status(500).json({
            status: "Failed",
            message: "Category Name is Required"
        })
    } else {

        Subcategory.find({ subcategoryname })
            .then((result) => {
                if (result.length) {
                    res.status(500).json({
                        status: "Failed",
                        message: "Sub category Name Already Exist"
                    })
                } else {
                    const newsubcategory = new Subcategory({
                        categoryId,
                        subcategoryname,
                        subcategoryimage: req.file.path
                    })

                    const subcategorysender = newsubcategory.save();

                    if (subcategorysender) {
                        res.status(200).json({
                            status: "success",
                            data: newsubcategory
                        })
                    } else {
                        res.status(500).json({
                            status: "Failed",
                            message: "Something went Wrong While trying to enter data into database"
                        })
                    }



                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    status: "Failed",
                    message: "error",
                })
            })

    }





}


//Edit Product code

module.exports.editsubCategory = ("/:id", async (req, res) => {

    var id = req.params.id
    var subcategoryname_subcategoryname = req.body.subcategoryname
    var categoryId_categoryId = req.body.categoryId
    var subcategoryimage_subcategoryimage = req.file.path


    Subcategory.findById(id, function (err, data) {
        data.subcategoryname = subcategoryname_subcategoryname ? subcategoryname_subcategoryname : data.subcategoryname;
        data.categoryId = categoryId_categoryId ? categoryId_categoryId : data.categoryId;
        data.subcategoryimage = subcategoryimage_subcategoryimage ? subcategoryimage_subcategoryimage : data.subcategoryimage;
        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "Sub Category Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });

})


//DELETE TYPE
module.exports.deleteSubcategory = ("/:id", async (req, res) => {
    try {
        await Subcategory.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Sub Category Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
});

//GET SINGLE TYPE BY USERS AND ADMIN
module.exports.getsubCategorybyid = ("/:id", async (req, res) => {
    try {
        const singlesubCategory = await Subcategory.findById(req.params.id)
        res.status(200).json({
            message: "success",
            data: singlesubCategory
        })

    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
})

//GET ALL TYPE
module.exports.getallsubCategory = ("/", async (req, res) => {
    try {
        const allsubCategory = await Subcategory.find()
            
            //console.log(allsubCategory._id)
        res.status(200).json({
            message: "success",
            noofsubcategory: allsubCategory.length,
            data: allsubCategory,
            //subcategoryid:_id
        });
    } catch (err) {
        res.status(500).json({ error: "Something went Wrong" })
    }
})

/* module.exports = router */