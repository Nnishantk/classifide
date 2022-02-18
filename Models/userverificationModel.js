const mongoose = require("mongoose");

const UserVerificationSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    uniqueString: { type: String },
    expiresAt: { type: Date },


}, { timestamps: true })
module.exports = mongoose.model("UserVerification", UserVerificationSchema)