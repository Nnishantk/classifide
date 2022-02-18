const mongoose = require("mongoose")

const ConversationSchema = mongoose.Schema({
    members: { type: Array },
    /* senderId: { type: String, required: true } */
}, { timestamps: true })
module.exports = mongoose.model("Conversation", ConversationSchema)