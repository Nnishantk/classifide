const mongoose = require("mongoose");


const FormcontrolSchema = mongoose.Schema({

    type: { type: String },
    hint: { type: String },
    value: { type: Array }

}, { timestamps: true })
module.exports = mongoose.model("Formcontrol", FormcontrolSchema)