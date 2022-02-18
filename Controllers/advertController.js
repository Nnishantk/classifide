const router = require("express").Router();
const Advert = require("../Models/advertModel")
const { Category } = require("../Models/categoryModel")
const { User } = require("../Models/userModel")
const PremiumCategory = require("../Models/premiumModel")


module.exports.addadvert = ("/", async (req, res) => {
    const newadvert = await new Advert(req.body);
    try {
        //generate bcrpyt password
        const advertview = await newadvert.save();
        res.status(200).json({
            message: "You have successfully Posted Advert",
            data: newadvert
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
});



//EDIT Business Profile
module.exports.EditAdvert = ("/:id", async (req, res) => {
    var id = req.params.id
    var advert_image = req.files
    var title_title = req.body.title
    var region_region = req.body.region
    var description_description = req.body.description
    var name_name = req.body.name
    var number_number = req.body.number
    var category_id_category_id = req.body.category_id
    var user_id_user_id = req.body.user_id
    var brand_brand = req.body.brand
    var condition_condition = req.body.condition
    var price_price = req.body.price
    var pincode_pincode = req.body.pincode
    var type_type = req.body.type
    var subtype_subtype = req.body.subtype
    var subcategory_id_id = req.body.subcategory_id


    Advert.findById(id, function (err, data) {
        data.advertimage = advert_image ? advert_image : data.advertimage;
        data.title = title_title ? title_title : data.title;
        data.region = region_region ? region_region : data.region;
        data.description = description_description ? description_description : data.description;
        data.name = name_name ? name_name : data.name;
        data.number = number_number ? number_number : data.number;
        data.category_id = category_id_category_id ? category_id_category_id : data.category_id;
        data.user_id = user_id_user_id ? user_id_user_id : data.user_id;
        data.brand = brand_brand ? brand_brand : data.brand;
        data.subtype = subtype_subtype ? subtype_subtype : data.subtype;
        data.type = type_type ? type_type : data.type;
        data.pincode = pincode_pincode ? pincode_pincode : data.pincode;
        data.price = price_price ? price_price : data.price;
        data.condition = condition_condition ? condition_condition : data.condition;
        data.subcategory_id = subcategory_id_id ? subcategory_id_id : data.subcategory_id

        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "Advert Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });

})


//DELETE Business Profile
module.exports.DeleteAdvert = ("/:id", async (req, res) => {
    try {
        await Advert.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Advert Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
});

//GET SINGLE TESTIMONY BY ADMIN
module.exports.GetAdvertbyID = ("/:id", async (req, res) => {
    try {
        const singleAdvert = await Advert.findById(req.params.id)
            .populate('category_id')
            .populate('premiumid')
        res.status(200).json({
            message: "success",
            noofadvert: singleAdvert.length,
            data: singleAdvert
        })

    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
})


module.exports.GetAdvertbyUserID = async (req, res) => {
    //const id = req.params.user_id
    try {
        const singleAdvert = await Advert.find({ user_id: req.params.user_id })

            .populate('category_id')
            .populate('premiumid')

        res.status(200).json({
            message: "success",
            noofadvert: singleAdvert.length,
            data: singleAdvert


        })
    }
    catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
}
//GET ALL Products

module.exports.GetallAdvert = ("/", async (req, res) => {

    let query = {};
    let qNew = req.query.new

    if (req.query.title) {
        query.title = req.query.title
    } /* else if (req.query.status) {

        query.status = req.query.status
    } */

    let total = await Advert.countDocuments(query);
    let page = (req.query.page) ? parseInt(req.query.page) : 1;
    let perPage = (req.query.perPage) ? parseInt(req.query.perPage) : 10;
    let skip = (page - 1) * perPage;

    query.push = ({
        $skip: skip
    });
    query.push = ({
        $limit: perPage
    })

    if (req.query.title) {
        query.$or = [
            { "title": { $regex: req.query.title, $options: 'i' } },

        ]
    } else if (req.query.status) {
        query.$or = [
            { "status": { $regex: req.query.status, $options: 'i' } },

        ]
    }


    let diplayallAdvert = await Advert.find(query)
        .populate('category_id')
        .populate('user_id')
        .populate('premiumid')
        .populate('formcontroller_id')
        .sort({ createdAt: -1 });
    if (qNew) {
        diplayallAdvert = await Advert.find().sort({ createdAt: -1 })
            .populate('category_id')
            .populate('user_id')
            .populate('premiumid')
    }

    /*  const counters = displayallAdvert.length
     console.log(counters) */

    return res.status(200).json({
        message: "success",
        noofadvert: diplayallAdvert.length,
        data: {

            data: diplayallAdvert,
            meta: {
                total: total,
                currentPage: page,
                perPage: perPage,
                totalPages: Math.ceil(total / perPage)
            }
        }
    })
    /* const qNew = req.query.new
    const qCategory = req.query.category

    const query = {};
    try {
        let productview;
        if (qNew) {
            productview = await Product.find().sort({ createdAt: -1 }).limit(2);
        } else if (qCategory) {
            productview = await Product.find({
                category_id: {
                    $in: [qCategory]
                },

            });
            console.log(productview);
        } else {
            productview = await Product.find();
        }
        res.status(200).json({
            message: "success",
            data: productview
        });

    } catch (err) {
        res.status(500).json({ error: "Something went Wrong" })
    } */
})


module.exports.updateusersplans = async (req, res) => {
    var premiumid_id = req.body.premiumid
    var id = req.params.id
    var plan = req.body.plan


    Advert.findById(id, function (err, data) {
        data.plan = "paid";
        data.premiumid = premiumid_id ? premiumid_id : data.premiumid;

        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "Advert Upgraded",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });
}

module.exports.approveadvert = async (req, res) => {
    var approveId = req.params.id
    var status_status = req.body.status
    Advert.findById(approveId, function (err, data) {
        data.status = status_status ? status_status : data.status
        data.save()
            .then(doc => {
                res.status(200).json({
                    message: "Advert Approved Successfully",
                    result: doc
                })
            })
            .catch(error => {``
                res.status(500).json({
                    message: "Failed",

                })
            })
    })

}


/* module.exports.getapprovedproduct = async (req, res) => {

} */




