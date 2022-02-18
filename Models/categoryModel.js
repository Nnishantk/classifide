const mongoose = require("mongoose");
module.exports.Category = mongoose.model('Category', mongoose.Schema({
    
    categoryname: { type: String, 
        required: true, 
        unique: true 
    },


    subcategorys:{
        type:[{
            subcategoryId: { 
        type: mongoose.Schema.Types.ObjectId, ref: "Subcategory",  },
 
       }]
    },

   categoryimage: { type: String }


}, { timestamps: true }));