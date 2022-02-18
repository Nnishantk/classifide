const mongoose = require("mongoose");
const Type = require("../Models/typeModel")


const SubtypeSchema = mongoose.Schema({
    typeId: { type: mongoose.Schema.Types.ObjectId, ref: "Type", index: true },
    subtypename: { type: String }

}, { timestamps: true })
module.exports = mongoose.model("Subtype", SubtypeSchema)