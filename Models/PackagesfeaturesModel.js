const mongoose = require("mongoose");



const PackageFeaturesSchema = mongoose.Schema({
    package_Id: { type: mongoose.Schema.Types.ObjectId, ref: "Package", index: true },
    promotionalpower: { type: String },
    listinginproperty: { type: String },
    listingincategory: { type: String },
    listinginothers: { type: String },
    promotionforselecteditems: { type: String },
    adsautorenew: { type: String },
    smsnotification: { type: String },
    emailandsocailpromo: { type: String },
    socialmedialink: { type: String },

}, { timestamps: true })
module.exports = mongoose.model("PackageFeatures", PackageFeaturesSchema)