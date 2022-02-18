const Packagefeature = require("../Models/PackagesfeaturesModel");
const Package = require("../Models/premiumModel")

module.exports.AddfeaturePackage = ("/", async (req, res) => {
    const newFeaturepackage = await new Packagefeature({
        package_Id: req.body.package_Id,
        promotionalpower: req.body.promotionalpower,
        listinginproperty: req.body.listinginproperty,
        listingincategory: req.body.listingincategory,
        listinginothers: req.body.listinginothers,
        promotionforselecteditems: req.body.promotionforselecteditems,
        adsautorenew: req.body.adsautorenew,
        smsnotification: req.body.smsnotification,
        emailandsocailpromo: req.body.emailandsocailpromo,
        socialmedialink: req.body.socialmedialink,
    });
    try {
        //generate bcrpyt password
        const featurepackages = await newFeaturepackage.save();
        res.status(201).json({
            message: "Feature Packages Added Successfully",
            data: featurepackages
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})


//Edit Product code

module.exports.editPackageFeature = ("/:id", async (req, res) => {
    var id = req.params.id

    var package_Id_edit = req.body.package_Id
    var promotionalpower_edit = req.body.promotionalpower
    var listinginproperty_edit = req.body.listinginproperty
    var listingincategory_edit = req.body.listingincategory
    var listinginothers_edit = req.body.listinginothers
    var promotionforselecteditems_edit = req.body.promotionforselecteditems
    var adsautorenew_edit = req.body.adsautorenew
    var smsnotification_edit = req.body.smsnotification
    var emailandsocailpromo_edit = req.body.emailandsocailpromo
    var socialmedialink_edit = req.body.socialmedialink

    Packagefeature.findById(id, function (err, data) {
        data.promotionalpower = package_Id_edit ? package_Id_edit : data.promotionalpower;
        data.listinginproperty = listinginproperty_edit ? listinginproperty_edit : data.listinginproperty;
        data.promotionalpower = promotionalpower_edit ? promotionalpower_edit : data.promotionalpower;
        data.listingincategory = listingincategory_edit ? listingincategory_edit : data.listingincategory;
        data.listinginothers = listinginothers_edit ? listinginothers_edit : data.listinginothers;
        data.promotionforselecteditems = promotionforselecteditems_edit ? promotionforselecteditems_edit : data.promotionforselecteditems;
        data.adsautorenew = adsautorenew_edit ? adsautorenew_edit : data.adsautorenew;
        data.smsnotification = smsnotification_edit ? smsnotification_edit : data.smsnotification;
        data.emailandsocailpromo = emailandsocailpromo_edit ? emailandsocailpromo_edit : data.emailandsocailpromo;
        data.socialmedialink = socialmedialink_edit ? socialmedialink_edit : data.socialmedialink;

        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "Package Feature Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });

})


//DELETE PRODUCT
module.exports.deletepackagefeaturebyid = ("/:id", async (req, res) => {
    try {
        await Packagefeature.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Package Feature Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
});

//GET SINGLE PRODUCT BY USERS AND ADMIN
module.exports.getpackagefeaturebyid = ("/:id", async (req, res) => {
    try {
        const singlepackagefeature = await Packagefeature.findById(req.params.id)
            .populate("package_Id")
        res.status(200).json({
            message: "success",
            data: singlepackagefeature
        })

    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
})

//GET ALL CATEGPRIES
module.exports.getallpackagefeature = ("/", async (req, res) => {
    try {
        const allpackagefeature = await Packagefeature.find()
            .populate("package_Id")

        res.status(200).json({
            message: "success",
            data: allpackagefeature

        });
    } catch (err) {
        res.status(500).json({ error: "Something went Wrong" })
    }
})

