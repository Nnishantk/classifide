const { AdminAuth } = require("../Models/Adminauth");
const Validator = require('fastest-validator');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const _ = require("lodash")


module.exports.adminregistration = async (req, res) => {
    const { email } = req.body
    AdminAuth.findOne({ email }).exec((err, admin) => {
        if (admin) {
            return res.status(401).json("Email Already Exist");
        }

        const newAdmin = new AdminAuth({
            adminpicture: req.file.path,
            fullname: req.body.fullname,
            number: req.body.number,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORDECRPY).toString(),
        })
        try {
            const saveAdmin = newAdmin.save();
            res.status(201).json({
                message: "Success",
                data: newAdmin
            })
        } catch (err) {
            res.status(500).json(err)
        }
    })
}

module.exports.authlogin = async (req, res) => {
    try {
        const user = await AdminAuth.findOne({ email: req.body.email })
        !user && res.status(401).json("Wrong Email")
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORDECRPY
        );
        const originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originalpassword !== req.body.password &&
            res.status(401).json("Invalid Password");

        //accesstoken generator
        const accessToken = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.SECRETK, { expiresIn: "1d" });

        const { password, ...others } = user._doc;
        res.status(200).json({
            message: "You have successfully Logged in",
            data: { ...others, accessToken }
        })

    } catch (err) {
        res.status(500).json("Opps!!! Something Went Wrong");
    }
}