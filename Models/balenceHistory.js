const mongoose = require("mongoose")

const balanceHistory = mongoose.Schema({
    trancation: { type: String },
    /* senderId: { type: String, required: true } */
}, { timestamps: true })
module.exports = mongoose.model("balenceHistory",balanceHistory)