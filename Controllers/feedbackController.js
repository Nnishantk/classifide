const router = require("express").Router();
const Feedback = require("../Models/feedbackModel")
const Advert = require("../Models/advertModel")
const User=require("../Models/userModel")
const { v4: uuidv4 } = require("uuid");

/* https://jiji.ng/create-opinion/user2256801 */

module.exports.givefeedback = async (req, res) => {
    
    const productID = req.params.id
  

    /* Feedback.findById({ productID }) */

    const { feedbackbutton, userId, advertId, feedbackmessege,receiverId,howitwas } = req.body
    if (feedbackmessege == '') {
        res.status(500).json({
            status: "Failed",
            message: "Message is Required",

        })
    } else if (userId == '') {
        res.status(500).json({
            status: "Failed",
            message: "User ID is Required",

        })
    } else if (advertId == '') {
        res.status(500).json({
            status: "Failed",
            message: "Advert ID is Required",

        })
    } else if (feedbackbutton == '') {
        res.status(500).json({
            status: "Failed",
            message: "Please Select any of the listed buttons",

        })
    } else {

        Feedback.find({ feedbackmessege })
            .then(result => {

                if (result.length) {
                    res.status(500).json({
                        status: "Failed",
                        message: "Feedback Message Already Exist",

                    })
                } else {
                    const SendFeedback = new Feedback({
                        feedbackbutton,
                        userId,
                        advertId,
                        feedbackmessege,
                        receiverId,
                        howitwas
                    })
                    SendFeedback.save()
                        .then(result => {
                            res.status(200).json({
                                status: "Success",
                                message: "Feedback Added successfully",
                                data: result
                            })
                        })
                }

            })
            .catch(error => {
                res.status(500).json({
                    status: "Failed",
                    message: "Error Occur While trying to give Feedback",

                })
            })
    }
}


module.exports.getallfeedback = async (req, res) => {
    try {
        const Diplayallfeedback = await Feedback.find()
            .populate("advertId")
            .populate("userId")
        res.status(200).json({
            status: "success",
            data: Diplayallfeedback

        })
    }
    catch {
        res.status(500).json({
            status: "success",
            message: "Error in Fetching feedback"

        })
    }
}

module.exports.getallfeedbackbyid = async (req, res) => {
    const feedbackid = req.params.id
    try {
        const displaybyId = await Feedback.findById(feedbackid)
        .populate("userId")
        .populate("advertId")
        res.status(200).json({
            status: "success",
            data: displaybyId

        })
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            data: "Error Occur When Trying to get single Feedback"

        })
    }
}

module.exports.deletefeedbackbyid = async (req, res) => {
    const feedbackid = req.params.id
    try {
        await Feedback.findByIdAndDelete(feedbackid)
        res.status(200).json({
            status: "Feedback deleted Successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            data: "Error Occur When Trying to get single Feedback"

        })
    }
}
module.exports.getmessagesbyreceivers=async(req,res)=>{
    const receiverId=req.params.receiverId
    try{
        const displaymessagesbysender = await Feedback.find({receiverId})
        .populate("userId")
        .populate("advertId")
        console.log(displaymessagesbysender)
        res.status(200).json({
            status: "success",
            data: displaymessagesbysender

        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            status: "Failed",
            data: error

        })
    }
}




module.exports.getmessagesbysender=async(req,res)=>{
    const userId=req.params.userId
    try{
        const displaymessagesbysenderid = await Feedback.find({userId})
        .populate("userId")
        .populate("advertId")
        /* console.log(displaymessagesbysender) */
        res.status(200).json({
            status: "success",
            data: displaymessagesbysenderid

        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            status: "Failed",
            data: error

        })
    }
}




module.exports.getfeedbacklink=async(req,res)=>{
    const userId=req.params.userId
    const uniqueString = uuidv4() + userId;
    let fullUrl = "https://classifiedapps.herokuapp.com/create-feedback/";
    try{
        const getfeedbacklink=await User.findById(userId)
        res.status(200).json({
            getfeedbacklink,
            postlinK:fullUrl+userId+"/"+uniqueString
        })
    }
    catch(error){
        res.status(500).json("Something Went Wrong")
    }
}

module.exports.getlinkverified = async (req, res) => {
    let {  uniqueString } = req.params

    const { feedbackbutton, userId, advertId, feedbackmessege,receiverId,howitwas } = req.body
    User
        .find({ userId })
        .then((result) => {
            if (result.length > 0) {
                    bcrypt
                        .compare(uniqueString, hashedUniqueString)
                        .then((result) => {
                            if (result) {
                                // string match
                                User
                                    .updateOne({ _id: userId }, { verified: true })
                                    .then(() => {
                                        UserVerification.deleteOne({ userId })
                                            .then(() => {
                                                res.sendFile(path.join(__dirname, "./../Views/Verify.html"))
                                            })
                                            .catch(error => {
                                                console.log(error)
                                                let message = "An error occur while finalizing successfull verification"
                                                res.redirect(`/user/verified/error=true&message=${message}`);
                                            })
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        let message = "An error occur while updating user record to show verified."
                                        res.redirect(`/user/verified/error=true&message=${message}`);
                                    })
                            } else {
                                //existing record but incorrect verificaton details
                                let message = "Invalid Verification details passed. check your inbox";
                                res.redirect(`/user/verified/error=true&message=${message}`);
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            let message = "An error occur while comparing unique strings"
                            res.redirect(`/user/verified/error=true&message=${message}`);
                        })
                
            } else {
                let message = "Account Record Does not Exist or Has Been Verified Already, Please Sign up or Login";
                res.redirect(`/user/verified/error=true&message=${message}`);
            }
        })
        .catch((error) => {
            console.log(error)
            let message = "An error occur when trying to checking for exiting user verificatioin record"
            res.redirect(`/user/verified/error=true&message=${message}`);
        })
}


