const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema({
    conversationId: { type: String, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
    text: { type: String }
}, { timestamps: true })
module.exports = mongoose.model("Message", MessageSchema)