const mongoose=require("mongoose");
const CitySchema=new mongoose.Schema({
   

    businessName:{
        type:String,
     required:true,  
     },

     deliveryOffer:{
        type:String,
     required:true,  
     },

     aboutCompony:{
        type:String,
     required:true,  
     },

     address:{
        type:String,
     required:true,  
     },

     WorkingHrs:{
         type:String,
         required:true,
     },

     WorkingDay:{
         type:String,
         required:true

     }

    
     
  },{timestamps:true})

module.exports=mongoose.model("BusinessInfo",CitySchema)

