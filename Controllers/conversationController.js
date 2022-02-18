const router = require("express").Router();
const Conversation = require("../Models/conversationModel")



module.exports.SendConversationByUser = async (req, res) => {
    const newconversation = new Conversation({
        members: [
            req.body.receiversId,
            req.body.senderId
        ]

    })

    try {
        const conversationsender = await newconversation.save()
        res.status(201).json({
            status: "success",
            message: "Message Sent Successfully",
            data: conversationsender
        })
    }
    catch (error) {
        res.status(500).json(error)
    }
}


module.exports.getconversationbyuser = async (req, res) => {
    try {
        const getsingleconversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).json({
            numberofconversation: getsingleconversation.length,
            status: "success",
            data: getsingleconversation

        })
    }
    catch (error) {
        res.status(500).json(error)
    }
}