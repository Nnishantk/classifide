const State=require("../Models/stateModel")
const City=require("../Models/cityModel")

module.exports.Addstate=async(req,res)=>{
    var  { statename,cityId }=req.body;
    if(statename==''){
        res.status(500).json({
            status:"Failed",
            message:"State Name Field is Empty"
        })
    }else{
        State.find({statename})
    .then((result)=>{
        if(result.length){
            res.status(500).json({
                status:"Failed",
                message:"State Already Exist"
            })
        }else{
            const newstate=new State({
                statename
            })

             newstate.cities={
          cityId:req.body.cityId,}

           try{
            const enterstate=newstate.save()
            
                res.status(201).json({
                    status:"Success",
                    data:newstate
                })
            
           }
           catch(error){
            res.status(500).json({
                status:"Failed",
                message:"Oops!!! Error Occurs"
            })
           }
        }
    })
    .catch(error=>{
            res.status(500).json({
                status:"Failed",
                message:error
        })
    })
    }
}




module.exports.Displayallstates=async(req,res)=>{
    try{
        const getallstate = await State.find({})
         .populate("cities.cityId") 
        res.status(200).json({
            status:"Success",
            data:getallstate
        })
    }
    catch(error){
        res.status(500).json(
            // message:"Oops!!! Something Went wrong",
            error.message
        )
    }
}

module.exports.getsinglestate=async(req,res)=>{
    const stateid=req.params.id
    try{
        const singlestate=await State.findById(stateid);
        res.status(200).json({
            status:"Success",
            data:singlestate
        })

    }
    catch(error){
        res.status(500).json({
            message:"Oops!!! Something Went wrong",
        })
    }
}

module.exports.deletestate=async(req,res)=>{
    const stateid=req.params.id
    try{
        const singlestate=await State.findByIdAndDelete(stateid);
        res.status(200).json({
            message:"State Deleted Successfully",
        })
    }
    catch(error){
        res.status(500).json({
            message:"Oops!!! Something Went wrong",
        })
    }
}

module.exports.updatestate=async(req,res)=>{
    var id = req.params.id
    var statename_edit = req.body.statename

    State.findById(id, function (err, data) {
        data.statename = statename_edit ? statename_edit : data.statename;
       
        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "State Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });
}