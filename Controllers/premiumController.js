const router = require("express").Router();
const PremiumCategory = require("../Models/premiumModel");


module.exports.AddPremiumcategory = async (req, res) => {
    let { premiumname, price, validity } = req.body
    let { premiumimage } = req.file.path

    if (premiumname == '' || price == '' || validity == '') {
        res.status(500).json({
            status: "Failed",
            message: "Please Enter Premium Name"
        })
    } else {
        PremiumCategory.find({ premiumname })
            .then((result) => {
                if (result.length) {
                    res.status(500).json({
                        status: "Failed",
                        message: "Premium Name Already Exist"
                    })
                } else {
                    const newPremium = new PremiumCategory({
                        premiumname,
                        price,
                        premiumimage: req.file.path,
                        validity
                    })
                    newPremium.save()
                        .then(result => {
                            res.status(200).json({
                                status: "Success",
                                message: "Premium Added Successfully",
                                data: result
                            })
                        })
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    status: "Failed",
                    message: "Something went Wrong While Trying to Save Data"
                })
            })
    }
}

module.exports.getallpremium = async (req, res) => {
    try {
        const getallpremium = await PremiumCategory.find();
        res.status(200).json({
            status: "success",
            data: getallpremium

        })
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Something went Wrong While Trying to fetch data"
        })
    }
}
module.exports.getsinglepremium = async (req, res) => {
    const premiumid = req.params.id
    try {
        const getsinglepremium = await PremiumCategory.findById(premiumid);
        res.status(200).json({
            status: "success",
            data: getsinglepremium

        })
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Something went Wrong While Trying to fetch data"
        })
    }
}

module.exports.updatepremium = async (req, res) => {

    var id = req.params.id
    var premium_name = req.body.premiumname
    var price_price = req.body.price
    var validity_validity = req.body.validity
    var premiumimage_premiumimage = req.file.path

    PremiumCategory.findById(id, function (err, data) {
        data.premiumname = premium_name ? premium_name : data.premiumname;
        data.price = price_price ? price_price : data.price;
        data.validity = validity_validity ? validity_validity : data.validity;
        data.premiumimage = premiumimage_premiumimage ? premiumimage_premiumimage : data.premiumimage;


        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "Premium Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });

}

module.exports.deletepremium = async (req, res) => {
    const premiumid = req.params.id
    try {
        await PremiumCategory.findByIdAndDelete(premiumid)
        res.status(200).json({
            message: "Premium Deleted Successfully",

        })
    }
    catch (error) {
        res.status(500).json({
            message: "Oops!!! Something WentWrong",

        })
    }
}

