const router = require("express").Router();
const Message = require("../Models/messageModel")



module.exports.SendMessageByUser = async (req, res) => {
    const messagesent = new Message(req.body)
    try {
        const messagesender = await messagesent.save();

        res.status(201).json({
            status: "success",
            data: messagesender,

        })

    }
    catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getconversation = async (req, res) => {
    try {
        const displaymessage = await Message.find({
            conversationId: req.params.conversationId
        })

        res.status(201).json({
            numberofmessages: displaymessage.length,
            status: "success",
            data: displaymessage

        })
    }
    catch (error) {
        res.status(500).json(error)
    }

}
module.exports.GetconversationbySenderid = async (req, res) => {
    try {
        const getmessagebysenderid = await Message.find({
            senderId: req.params.senderId
        })
        res.status(200).json({
            numberofmessages: getmessagebysenderid.length,
            status: "success",
            data: getmessagebysenderid
        })
    }
    catch (error) {
        res.status(500).json(error)
    }
}