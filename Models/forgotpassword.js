const mongoose = require("mongoose");

const PasswordResetSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    otp: { type: String },
    expiresAt: { type: Date },


}, { timestamps: true })
module.exports = mongoose.model("PasswordReset", PasswordResetSchema)