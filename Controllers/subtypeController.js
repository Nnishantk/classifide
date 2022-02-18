const Subtype = require("../Models/subTypeModel")
const { Type } = require("../Models/typeModel")




module.exports.addSubType = ("/", async (req, res) => {
    var { subtypename, typeId } = req.body
    Subtype.find({ subtypename })
        .then((result) => {
            if (result.length) {
                res.status(500).json({
                    status: "Failed",
                    message: "Sub Type Name Already Exist"
                })
            } else {
                const newsubType = new Subtype({
                    subtypename: req.body.subtypename,
                    typeId: req.body.typeId
                });
                try {
                    //generate bcrpyt password
                    const subtypedetails = newsubType.save();
                    if (subtypedetails) {
                        res.status(200).json({
                            message: "Sub Type Added Successfully",
                            data: newsubType
                        })
                    } else {
                        res.status(500).json({
                            message: "Type ID does not exist",
                        })
                    }

                } catch (err) {
                    res.status(500).json({
                        error: err
                    })
                }
            }
        })
        .catch(error => {
            res.status(500).json({
                status: "Failed",
                message: "Something Went Wrong  when trying to save data",

            })
        })



})


//Edit Product code

module.exports.editsubType = ("/:id", async (req, res) => {

    var id = req.params.id
    var subtype_name = req.body.subtypename

    Subtype.findById(id, function (err, data) {
        data.subtypename = subtype_name ? subtype_name : data.subtypename;
        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "Sub Type Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });

})


//DELETE TYPE
module.exports.deleteSubtype = ("/:id", async (req, res) => {
    try {
        await Subtype.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Sub Type Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
});

//GET SINGLE TYPE BY USERS AND ADMIN
module.exports.getsubtypebyid = ("/:id", async (req, res) => {
    try {
        const singlesubType = await Subtype.findById(req.params.id)
        res.status(200).json({
            message: "success",
            data: singlesubType
        })

    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
})

//GET ALL TYPE
module.exports.getallsubType = ("/", async (req, res) => {
    try {
        const allsubType = await Subtype.find()
            .populate("typeId")
        res.status(200).json({
            message: "success",
            data: allsubType
        });
    } catch (err) {
        res.status(500).json({ error: "Something went Wrong" })
    }
})

/* module.exports = router */