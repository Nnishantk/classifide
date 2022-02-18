const mongoose = require("mongoose")

const FeedbackSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    feedbackbutton: { type: String },
    howitwas:{type:String},
    advertId: { type: mongoose.Schema.Types.ObjectId, ref: "Advert", index: true },
    receiverId:{type:mongoose.Schema.Types.ObjectId, ref: "User", index: true},
    feedbackmessege: { type: String, required: true }
})

module.exports = mongoose.model("Feedback", FeedbackSchema)

