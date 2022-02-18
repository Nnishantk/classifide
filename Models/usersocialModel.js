const mongoose = require("mongoose");
const User = require("../Models/userModel")




const UsersocialSchema = mongoose.Schema({
    facebook: { type: String, default: null },
    instagram: { type: String, default: null },
    twitter: { type: String, default: null },
    olx: { type: String, default: null },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: User, index: true }

}, { timestamps: true })
module.exports = mongoose.model("Usersocial", UsersocialSchema)