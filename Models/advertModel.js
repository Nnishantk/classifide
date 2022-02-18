const mongoose = require("mongoose");
const { Category } = require("../Models/categoryModel")
const { User } = require("../Models/userModel")
const PremiumCategory = require("../Models/premiumModel")
require('mongoose-double')(mongoose);


var SchemaTypes = mongoose.Schema.Types;
const AdvertSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    region: { type: String },
    description: [{ type: String }],
       
  
    name: { type: String },
    number: { type: String },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        index: true
    },
    subcategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        index: true
    },

       formcontroller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Formcontrol',
        index: true
    },

    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    advertimage: [{ type: Array}],
    condition: { type: String },
    price: { type: SchemaTypes.Double },
    type: { type: String },
    premiumid: { type: mongoose.Schema.Types.ObjectId, ref: 'PremiumCategory', index: true },
    status: { type: String, default: "pending" }
}, { timestamps: true });
module.exports = mongoose.model("Advert", AdvertSchema)