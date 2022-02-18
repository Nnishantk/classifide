const Usersocial = require("../Models/usersocialModel")
const { User } = require("../Models/userModel")

module.exports.editsocial = ("/:id", async (req, res) => {
    var id = req.params.id
    //var id = req.params.userid
    var facebook_facebook = req.body.facebook
    var instagram_instagram = req.body.instagram
    var twitter_twitter = req.body.twitter
    var olx_olx = req.body.olx
    //var userid_userid = req.body.userid
    Usersocial.findById(id, function (err, data) {
        data.facebook = facebook_facebook ? facebook_facebook : data.facebook;
        data.instagram = instagram_instagram ? instagram_instagram : data.instagram;
        data.twitter = twitter_twitter ? twitter_twitter : data.twitter;
        data.olx = olx_olx ? olx_olx : data.olx;
        //data.userid = userid_userid ? userid_userid : data.userid
        data.save()
            .then(data => {
                res.status(201).json({
                    status: "success",
                    message: "Social Media Added Successfully",
                    data: data
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    status: "Failed",
                    message: "Error Occured when trying to Add User Social Links"
                })
            })

    })
})

