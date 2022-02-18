const mongoose = require("mongoose");


const TypeSchema = mongoose.Schema({
    typename: { type: String }

}, { timestamps: true })
module.exports = mongoose.model("Type", TypeSchema)