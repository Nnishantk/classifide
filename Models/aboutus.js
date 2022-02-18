const mongoose = require("mongoose");


const AboutSchema = mongoose.Schema({
    mobilenumber: { type: String },
    email: { type: String },
    address: { type: String },

}, { timestamps: true })
module.exports = mongoose.model("About", AboutSchema)