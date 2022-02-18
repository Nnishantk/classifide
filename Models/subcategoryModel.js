const mongoose = require("mongoose");



const SubcategorySchema = mongoose.Schema({
   
        subcategoryname:{
            required:true,
                 type: String },

    subcategoryimage: { type: String }

}, { timestamps: true })
module.exports = mongoose.model("Subcategory", SubcategorySchema)