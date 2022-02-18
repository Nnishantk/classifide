const City=require("../Models/cityModel")
const State=require("../Models/stateModel")

module.exports.AddCity=async(req,res)=>{
    const {cityname}=req.body
    City.find({cityname})
    .then((result)=>{
        if(result.length){
            res.status(500).json({
                status:"Failed",
                message:"City Already Exist"
            })
        }else{
            const newcity=new City({
                cityname,
                stateID
            })
           try{
            const entercity=newcity.save()
            
                res.status(201).json({
                    status:"Success",
                    data:newcity
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
    .catch((error)=>{
            console.log(error)
            res.status(500).json({
                status:"Failed",
                message:error
            })
    })
}

module.exports.Displayallcity=async(req,res)=>{
    try{
        const getallcity=await City.find()
        const { password, ...others } = getallcity._doc
        .populate("stateID")
        res.status(200).json({
            status:"Success",
            data:{...others, _id}


            /* data:getallcity */
        })
    }
    catch(error){
        res.status(500).json({
            message:"Oops!!! Something Went wrong",
        })
    }
}






module.exports.getsinglecity=async(req,res)=>{
    // const cityid=req.params.id
    try{
        const singlecity=await City.findById()
        res.status(200).json({
            status:"Success",
            data:singlecity
        })

    }
    catch(error){
        res.status(500).json({
            message:"Oops!!! Something Went wrong",
        })
    }
}

module.exports.deletecity=async(req,res)=>{
    const cityid=req.params.id
    try{
        const singlecity=await City.findByIdAndDelete(cityid);
        res.status(200).json({
            message:"City Deleted Successfully",
        })
    }
    catch(error){
        res.status(500).json({
            message:"Oops!!! Something Went wrong",
        })
    }
}

module.exports.updatecity=async(req,res)=>{
    var id = req.params.id
    var cityname_edit = req.body.cityname
    var stateID_edit = req.body.stateID
    

    City.findById(id, function (err, data) {
        data.cityname = cityname_edit ? cityname_edit : data.cityname;
        data.stateID = stateID_edit ? stateID_edit : data.stateID;
       
        data.save()
            .then(doc => {
                res.status(201).json({
                    message: "city Updated Successfully",
                    result: doc
                })
            })
            .catch(err => {
                res.json(err)
            })
    });
}

module.exports.getcitybystateid=async(req,res)=>{
    const stateID=req.params.stateID
    try{
        const singlestatecity=await City.find({stateID});
        console.log(singlestatecity)
        res.status(200).json({
            Status:"Success",
            data:singlestatecity
        })
    }
    catch(error){
        res.status(500).json({
            message:"Oops!!! Something Went wrong",
        })
    }
}