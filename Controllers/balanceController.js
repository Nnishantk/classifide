const balanceHistory =  require('../Models/balenceHistory');




 exports.addBalance = (req, res) => {

 
  const { trancation
           } =req.body
      const saveBalance = new balanceHistory({
           trancation
      })


     saveBalance.save((err,data) =>{
        if (err) {
          return res.status(400).json({
            message:"Something Went Wrong"
          })
        }

        if (data) {
          res.status(200).json({
            message:"Balance Add Successfully..!"
            // data
          })
        }
      })
     
    }




 module.exports.getallbalanceHistory = ("/", async (req, res) => {
    try {
        const allcategories = await balanceHistory.find({})
        
        res.status(200).json({
            message: "success",
            data: allcategories
        });

    } catch (err) {
        res.status(500).json({ error: "Something went Wrong" })
    }
})


