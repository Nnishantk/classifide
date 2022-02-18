const router = require("express").Router();
const Formcontrol = require("../Models/formControlModel");


module.exports.Addformcontroll = async (req, res) => {

    const { hint } = req.body
    Formcontrol.find({ hint })
        .then(data => {
            if (data.length) {
                res.status(500).json("You have already entered this hint")
            } else {
                const NewFormControl = new Formcontrol({
                    type: req.body.type,
                    hint: req.body.hint,
                    value: req.body.value
                })
                const enteredformcontrol = NewFormControl.save()
                    .then(doc => {
                        res.status(201).json({
                            status: "Success",
                            form: doc
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            status: "Failed",
                            message: "Error Occur while trying to enter Data"
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                status: "Failed",
                message: "Error Occur while trying to check exisitgn Data"
            })
        })

}






module.exports.getallformcontrol = async (req, res) => {
    try {
        const formcontrol = await Formcontrol.find();
        res.status(200).json({
            status: "success",
            message: formcontrol

        })
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Something went Wrong While Trying to fetch data"
        })
    }
}
module.exports.getsingleformcontrolbyid = async (req, res) => {
    const formid = req.params.id
    try {
        const getsingleform = await Formcontrol.findById(formid);
        res.status(200).json({
            status: "success",
            message: getsingleform

        })
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Something went Wrong While Trying to fetch data"
        })
    }
}

module.exports.updateformcontrol = async (req, res) => {
    var id = req.params.id
    var type_edit = req.body.type
    var hint_edit = req.body.hint
    var value_edit = req.body.value
    Formcontrol.findById(id, function (err, data) {
        data.type = type_edit ? type_edit : data.type;
        data.hint = hint_edit ? hint_edit : data.hint;
        data.value = value_edit ? value_edit : data.value;
        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "Form Control Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });

}

module.exports.deleteformcontrol = async (req, res) => {
    const deleteid = req.params.id

    try {
        await Formcontrol.findByIdAndDelete(deleteid)
        res.status(201).json({
            message: "Form Controll Deleted Successfully",

        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error Occur While trying to delete about",

        })
    }

}



