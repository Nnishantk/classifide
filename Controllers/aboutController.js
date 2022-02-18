const router = require("express").Router();
const About = require("../Models/aboutus");


module.exports.Addabout = async (req, res) => {
    let { mobilenumber, email, address } = req.body


    if (mobilenumber == '' || email == '' || address == '') {
        res.status(500).json({
            status: "Failed",
            message: "Empty Field is required"
        })
    } else {
        About.find({ mobilenumber })
            .then((result) => {
                if (result.length) {
                    res.status(500).json({
                        status: "Failed",
                        message: "Address Already Exit"
                    })
                } else {
                    const newabout = new About({
                        mobilenumber,
                        email,
                        address
                    })
                    newabout.save()
                        .then(result => {
                            res.status(200).json({
                                status: "Success",
                                message: "Contact Added successfully",
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



