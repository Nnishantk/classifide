const Package = require("../Models/premiumModel");
const { Subpremiumcategory } = require("../Models/subpremiumcategoryModel")

module.exports.AddPackage = ("/", async (req, res) => {
    const newAddpackage = await new Package({
        subpremiumcategoryId: req.body.subpremiumcategoryId,
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
    });
    try {
        //generate bcrpyt password
        const packages = await newAddpackage.save();
        res.status(201).json({
            message: "Packages Added Successfully",
            data: packages
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})


//Edit Product code

module.exports.editpackage = ("/:id", async (req, res) => {
    var id = req.params.id
    var subpremiumcategoryId_variable = req.body.subpremiumcategoryId
    var name_variable = req.body.name
    var price_variable = req.body.price
    var discount_variable = req.body.discount

    Package.findById(id, function (err, data) {
        data.subpremiumcategoryId = subpremiumcategoryId_variable ? subpremiumcategoryId_variable : data.subpremiumcategoryId;
        data.name = name_variable ? name_variable : data.name;
        data.price = price_variable ? price_variable : data.price;
        data.discount = discount_variable ? discount_variable : data.discount;

        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "Package Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });

})


//DELETE PRODUCT
module.exports.deletepackagebyid = ("/:id", async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Package Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
});

//GET SINGLE PRODUCT BY USERS AND ADMIN
module.exports.getpackagebyid = ("/:id", async (req, res) => {
    try {
        const singlepackage = await Package.findById(req.params.id)
            .populate("subpremiumcategoryId")
        res.status(200).json({
            message: "success",
            data: singlepackage
        })

    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
})

//GET ALL CATEGPRIES
module.exports.getallpackage = ("/", async (req, res) => {

    try {
        const allpackage = await Package.find()
            .populate("subpremiumcategoryId")
        res.status(200).json({
            message: "success",
            data: allpackage

        });
    } catch (err) {
        res.status(500).json({ error: "Something went Wrong" })
    }
})


module.exports.getpackagesbysubpremiumcategoryid = async (req, res) => {
    const subpremiumcategoryId = req.params.subpremiumcategoryId 
    try {
        const singlepackage = await Package.find({ subpremiumcategoryId })
        res.status(200).json({
            status: "Success",
            data: singlepackage
        })

    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
}



module.exports.packagecalculator = async (req, res) => {
    const subpremiumcategoryId = req.params.subpremiumcategoryId
    try {
        const singlepackage = await Package.find({ subpremiumcategoryId })
            .then(result => [
                console.log(result.price)
            ])



        /* const threemonth = 3
        const calculatorprice = singlepackage.data[0].price
        const calculateall = (calculatorprice * threemonth) * 0.18
        console.log(calculatorprice) */
        /* console.log(calculateall.toFixed(0)) */

    } catch (err) {
        res.status(500).json(err)
    }
}

