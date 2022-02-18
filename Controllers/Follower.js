const { Follower } = require("../Models/Follower");


exports.Follower = async (req, res) => {
    const { email } = req.body
   

        const newfollower = new Follower({
             follower = req.body.follower,
             followee = req.params.id
            
            
        })
        try {
            const saveFollow = newAdmin.save();
            res.status(201).json({
                message: "Success",
                data: newAdmin
            })
        } catch (err) {
            res.status(500).json(err)
        }
    
}