const mongoose=require("mongoose");

const CitySchema=new mongoose.Schema({
   

    cityname:{type:String, 
     required:[true, "City Name is Required"]}
     
  },{timestamps:true})

module.exports=mongoose.model("City",CitySchema)

