const mongoose = require("mongoose");
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const PackageSchema = mongoose.Schema({
    subpremiumcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Subpremiumcategory", index: true },
    name: { type: String },
    price: { type: SchemaTypes.Double },
    discount: { type: Number }

}, { timestamps: true })
module.exports = mongoose.model("Package", PackageSchema)