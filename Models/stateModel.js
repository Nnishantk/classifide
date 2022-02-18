const {model,Schema} =require("mongoose");

const StateSchema=new Schema({


    statename:{
        type:String
    },

            cities:{
                type:[{
                    cityId: { 
                    type: Schema.Types.ObjectId,
                     ref:"City", 
                     },
             
                   }]
                },
                    
},{timestamps:true})

module.exports= model("State",StateSchema)

