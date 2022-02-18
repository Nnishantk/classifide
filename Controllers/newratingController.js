const router = require("express").Router();
const { Rate } = require("../Models/newratingModel");


module.exports.Addrate = async (req, res) => {
    const { userId, noOfStars } = req.body


    if (userId == '' || noOfStars == '') {
        res.status(500).json({
            status: "Failed",
            message: "Empty Field is required"
        })
    } else {
        Rate.find({ userId })
            .then((result) => {
                if (result.length) {
                    res.status(500).json({
                        status: "Failed",
                        message: "You Have Already Rated This Product"
                    })
                } else {
                    const newRate = new Rate({
                        userId,
                        noOfStars
                    })
                    newRate.save()
                        .then(result => {
                            res.status(200).json({
                                status: "Success",
                                message: "You have rated this Product",
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


module.exports.calculation = async (req, res) => {
   db.Rate.aggregate({
        $group: {
            _id: '$userId',
            count: { $sum: 1 },
            avg: { $avg: '$noOfStars' }
        }
    },
        {
            $project: {
                _id: 1,
                count: 1,
                avg: {
                    $round: ['$avg', 1]
                }
            }
        })
}



module.exports.getallcontact = async (req, res) => {
    try {
        const Aboutcontact = await About.find();
        res.status(200).json({
            status: "success",
            message: Aboutcontact

        })
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Something went Wrong While Trying to fetch data"
        })
    }
}
module.exports.getsingleabout = async (req, res) => {
    const contactid = req.params.id
    try {
        const getsinglecontact = await About.findById(contactid);
        res.status(200).json({
            status: "success",
            message: getsinglecontact

        })
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Something went Wrong While Trying to fetch data"
        })
    }
}

module.exports.updateAbout = async (req, res) => {
    //mobilenumber, email, address
    var id = req.params.id
    var mobilenumber_mobilenumber = req.body.mobilenumber
    var email_email = req.body.email
    var address_address = req.body.address


    About.findById(id, function (err, data) {
        data.mobilenumber = mobilenumber_mobilenumber ? mobilenumber_mobilenumber : data.mobilenumber;
        data.email = email_email ? email_email : data.email;
        data.address = address_address ? address_address : data.address;
        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "About Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });

}

module.exports.deleteabout = async (req, res) => {
    const deleteid = req.params.id

    try {
        await About.findByIdAndDelete(deleteid)
        res.status(201).json({
            message: "About Deleted Successfully",

        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error Occur While trying to delete about",

        })
    }

}



