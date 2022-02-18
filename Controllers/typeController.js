const Type = require("../Models/typeModel")



module.exports.addType = ("/", async (req, res) => {
    var { typename } = req.body
    Type.find({ typename })
        .then((result) => {
            if (result.length) {
                res.status(500).json({
                    status: "Failed",
                    message: "Type Name Already Exist"
                })
            } else {
                const newType = new Type({
                    typename: req.body.typename,
                });
                try {
                    //generate bcrpyt password
                    const typedetails = newType.save();
                    res.status(200).json({
                        message: "Type Added Successfully",
                        data: newType
                    })
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

module.exports.editType = ("/:id", async (req, res) => {

    var id = req.params.id
    var type_name = req.body.typename

    Type.findById(id, function (err, data) {
        data.typename = type_name ? type_name : data.typename;
        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "Type Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });

})


//DELETE TYPE
module.exports.deletetype = ("/:id", async (req, res) => {
    try {
        await Type.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Type Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
});

//GET SINGLE TYPE BY USERS AND ADMIN
module.exports.gettypebyid = ("/:id", async (req, res) => {
    try {
        const singleType = await Type.findById(req.params.id)
        res.status(200).json({
            message: "success",
            data: singleType
        })

    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
})

//GET ALL TYPE
module.exports.getallType = ("/", async (req, res) => {

    try {
        const allType = await Type.find();
        res.status(200).json({
            message: "success",
            data: allType
        });

    } catch (err) {
        res.status(500).json({ error: "Something went Wrong" })
    }
})

/* module.exports = router */