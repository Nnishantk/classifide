const  Bussines  = require("../Models/Bussiness");

exports.addBussiness =  async (req, res) => {
    const newBussines = new Bussines({
        businessName : req.body.businessName,
        deliveryOffer: req.body.deliveryOffer,
        aboutCompony : req.body.aboutCompony,
        address : req.body.address,
        WorkingHrs : req.body.WorkingHrs,
        WorkingDay : req.body.WorkingDay,
    });
  
    try {
        
        const bussiness = await newBussines.save();
        res.status(201).json({
            message: "Bussines Addedd Successfully",
            data: bussiness
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.getallCompony = ("/", async (req, res) => {
    try {
        const allcompony= await Bussines.find({})
        
        res.status(200).json({
            message: "success",
            data: allcompony
        });

    } catch (err) {
        res.status(500).json({ error: "Something went Wrong" })
    }
})


exports.getcomponybyid = ("/:id", async (req, res) => {
    try {
        const singleBussines = await Bussines.findById(req.params.id)
        res.status(200).json({
            message: "success",
            data: singleBussines
        })

    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
})

exports.updateBussiness = async (req, res) => {
    const { businessName,deliveryOffer, aboutCompony ,address,WorkingHrs,WorkingDay
             } =req.body
    try {
      const updateBussiness = await Bussines.findByIdAndUpdate(
        {
          _id: ObjectId(req.params.id),
        },
        {
             businessName, 
              deliveryOffer, 
             aboutCompony ,
             address,
             WorkingHrs,
             WorkingDay,
         
        }
      );
      res.status(200).json({ msg: "User successfully updated", updateBussiness });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  };

exports.deleteBusiness=async(req,res)=>{
    const bussinessid=req.params.id
    try{
        const singlBissiness=await Bussines.findByIdAndDelete(bussinessid);
        res.status(200).json({
            message:"Bussines Deleted Successfully",
        })
    }
    catch(error){
        res.status(500).json({
            message:"Oops!!! Something Went wrong",
        })
    }
}
