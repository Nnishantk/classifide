const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true,select:false},
    /*  resetlink: { type: String, default: null }, */
    verified: { type: Boolean },
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    location: { type: String, default: null },
    birthday: { type: String, default: null },
    gender: { type: String, default: null },
    facebook: { type: String, default: null },
    instagram: { type: String, default: null },
    twitter: { type: String, default: null },
    olx: { type: String, default: null },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] }


}, { timestamps: true })
module.exports = mongoose.model("User", UserSchema)