const mongoose = require("mongoose");



const SubpremiumcategorySchema = mongoose.Schema({
    subcategorypremiumname: { type: String },
    subcategorypremiumimage: { type: String },
}, { timestamps: true })
module.exports = mongoose.model("Subpremiumcategory", SubpremiumcategorySchema)