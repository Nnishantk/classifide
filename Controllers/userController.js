const User = require("../Models/userModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const bcrypt = require("bcrypt")
require("dotenv").config();
const UserVerification = require("../Models/userverificationModel")
const PasswordReset = require("../Models/forgotpassword")
const Usersocial = require("../Models/usersocialModel");
const otpGenerator = require('otp-generator');



//nodemailer configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
        user:" shadabakhtar476@gmail.com",
        pass: "razaraza"
    },
    tls: {
        rejectUnauthorized: false,
    },
});




//testing transporter
transporter.verify((error, success) => {
    if (error) {
        console.log(error)
    } else {
        console.log("ready for message");
        console.log(success)
    }
})



module.exports.userregistration = async (req, res) => {
    let { username, number, email, password } = req.body
    username = username.trim();
    number = number.trim();
    email = email.trim();
    //password = password.trim();

    if (username == '' || number == '' || email == '' || password == '') {
        res.status(500).json({
            status: "Failed",
            message: "Empty Input Fields!"
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.status(500).json({
            status: "Failed",
            message: "Invalid Email Name"
        })
    } else if (password.length < 8) {
        res.status(500).json({
            status: "Failed",
            message: "Password is too short"
        })
    } else {

        User.find({ email })
            .then(result => {
                if (result.length) {
                    res.status(500).json({
                        Status: "Failed",
                        message: "Email Already Exist"
                    })
                } else {
                    const saltRounds = 10
                    bcrypt.hash(password, saltRounds).then(hashedPassword => {



                        const newUser = new User({
                            username,
                            number,
                            email,
                            verified: false,
                            password: hashedPassword
                            /*  password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORDECRPY).toString(), */
                        });

                        newUser.save().then(result => {
                            res.status(201).json({
                                Status: "success",
                                message: "User Created Successfully!!! Kindly Ckeck Your Email For Verification Link",
                                //data: result
                            })
                            //let { result._id} = req.body
                            const newsocial = new Usersocial({
                                //usersidentity: req.body._id,
                                userid: result._id
                            })
                            newsocial.save()
                            sendVerificationEmail(result, res);
                            //console.log(sendVerificationEmail(result));
                        })

                    }).catch((error) => {
                        console.log(error)
                        res.status(500).json({
                            Status: "Failed",
                            message: "Something went wrong while trying to hash a password",
                        })
                    })
                }

            }).catch(error => {
                console.log(error);
                res.status(500).json({
                    status: "Failed",
                    message: "An error occur while trying to fetch for existing user"
                })
            });
    }
}


const sendVerificationEmail = ({ _id, email }, res) => {
    //var fullUrl = "https://";
    let fullUrl = "https://classifiedapps.herokuapp.com/api/v1/";
    const uniqueString = uuidv4() + _id;
    const mailOptions = {

        from: "Zercom Systems",
        //from: process.env.AUTH_EMAIL,
        to: email,
        subject: "verify Your Email",
        html: `<p>Verify Your email address to complete the signup and login into your account</p> <p>This Link<b> expires in 6 hours</b><p>Press <a href=${fullUrl + "user/getverification/" + _id + "/" + uniqueString}>here </a> to proceed</p></p>`
    };
    // hash the uniquestrong
    const saltRounds = 10
    bcrypt
        .hash(uniqueString, saltRounds)
        .then((hashedUniqueString) => {
            const newVerification = new UserVerification({
                userId: _id,
                uniqueString: hashedUniqueString,
                expiresAt: Date.now() + 21600000

            })

            console.log(newVerification);
            newVerification
                .save()
                .then(() => {
                    transporter
                        .sendMail(mailOptions)
                        .then(() => {
                            res.status(200).json({
                                status: "PENDING",
                                message: "Verification Sent"
                            })
                        })
                        .catch((error) => {
                            res.status(500).json({
                                status: "Failed",
                                message: "Verification Failed"
                            })
                        })
                })
                .catch((error) => {
                    console.log(error)
                    res.status(500).json({
                        status: "Failed",
                        message: "Could not save Verification email data"
                    })
                })
        })
        .catch(() => {
            res.status(500).json({
                status: "Failed",
                message: "An error Occured while hashing email data"
            })
        })

}



module.exports.Userlogin = async (req, res) => {
    let { email, password } = req.body
    if (email == '' || password == '') {
        res.status(500).json({
            Status: "Failed",
            message: "Empty Credentials Supplied!"
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.status(500).json({
            status: "Failed",
            message: "Invalid Email Name"
        })
    } else if (password.length < 8) {
        res.status(500).json({
            status: "Failed",
            message: "Password Too Small"
        })
    } else {

        User.find({ email })
            .then(data => {
                if (data.length) {

                    //check if user is verified
                    if (!data[0].verified) {
                        res.status(500).json({
                            status: "Failed",
                            message: "User has not been verified"
                        })
                    } else {
                        const hashedPassword = data[0].password;

                        const accessToken = jwt.sign({
                            id: data._id,
                        }, process.env.SECRETK, { expiresIn: "1d" });
                        //const { password, ...others } = user._doc;
                        bcrypt.compare(password, hashedPassword)
                            .then(result => {
                                if (result) {
                                    res.status(200).json({
                                        status: "success",
                                        message: "You have successfully Logged in",
                                        token: accessToken,
                                        data: data
                                    })
                                } else {
                                    res.status(200).json({
                                        status: "success",
                                        message: "Invalid Password",

                                    })
                                }
                            })
                            .catch(error => {
                                res.status(500).json({
                                    status: "Failed",
                                    message: "An error occur while comparing the password",
                                })
                            })
                    }
                } else {

                    res.status(500).json({
                        status: "Failed",
                        message: "Invaid Credentials",
                    })

                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "Failed",
                    message: "Error Occur while trying to get existing Users",
                })
            })

    }

}

module.exports.getverification = async (req, res) => {
    let { userId, uniqueString } = req.params
    UserVerification
        .find({ userId })
        .then((result) => {
            if (result.length > 0) {
                const { expiresAt } = result[0];
                const hashedUniqueString = result[0].uniqueString;
                if (expiresAt < Date.now()) {
                    UserVerification.deleteOne({ userId })
                        .then((result) => {
                            User
                                .deleteOne({ _id: userId })
                                .then(() => {

                                    let message = "Link Expired, Please Signup Again"
                                    res.redirect(`/user/verified/error=true&message=${message}`);
                                })
                                .catch((error) => {
                                    console.log(error)
                                    let message = "Clearing Users with expired unique String Failed"
                                    res.redirect(`/user/verified/error=true&message=${message}`);
                                })
                        })
                        .catch((error) => {
                            console.log(error)
                            let message = "An error occur while clearing expired user verification record"
                            res.redirect(`/user/verified/error=true&message=${message}`);
                        })
                } else {
                    //valid record exists, so we validate  the user string
                    bcrypt
                        .compare(uniqueString, hashedUniqueString)
                        .then((result) => {
                            if (result) {
                                // string match
                                User
                                    .updateOne({ _id: userId }, { verified: true })
                                    .then(() => {
                                        UserVerification.deleteOne({ userId })
                                            .then(() => {
                                                res.sendFile(path.join(__dirname, "./../Views/Verify.html"))
                                            })
                                            .catch(error => {
                                                console.log(error)
                                                let message = "An error occur while finalizing successfull verification"
                                                res.redirect(`/user/verified/error=true&message=${message}`);
                                            })
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        let message = "An error occur while updating user record to show verified."
                                        res.redirect(`/user/verified/error=true&message=${message}`);
                                    })
                            } else {
                                //existing record but incorrect verificaton details
                                let message = "Invalid Verification details passed. check your inbox";
                                res.redirect(`/user/verified/error=true&message=${message}`);
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            let message = "An error occur while comparing unique strings"
                            res.redirect(`/user/verified/error=true&message=${message}`);
                        })
                }
            } else {
                let message = "Account Record Does not Exist or Has Been Verified Already, Please Sign up or Login";
                res.redirect(`/user/verified/error=true&message=${message}`);
            }
        })
        .catch((error) => {
            console.log(error)
            let message = "An error occur when trying to checking for exiting user verificatioin record"
            res.redirect(`/user/verified/error=true&message=${message}`);
        })
}

module.exports.verifiedhtml = async (req, res) => {
    res.sendFile(path.join(__dirname, "./../Views/verified.html"))
}


module.exports.forgotpassword = async (req, res) => {
    //const id = req.params.id
    const { email } = req.body
    User.find({ email })
        .then((data) => {
            if (data.length) {
                //user exists
                if (!data[0].verified) {
                    res.status(500).json({
                        status: "Failed",
                        message: "Email has not been verified"
                    })
                } else {
                    sendResetEmail(data[0], res)
                }
            }
        })
        .catch((error) => {
            res.status(500).json({
                status: "Failed",
                message: "No Account associated with this account"
            })
        })

}

const sendResetEmail = ({ _id, email }, res) => {
    const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false }); + _id;
    /* const resetString = uuidv4() + _id; */

    PasswordReset
        .deleteMany({ userId: _id })
        .then(result => {
            const mailOptions = {

                //from: "Zercom Systems",
                from: process.env.AUTH_EMAIL,
                to: email,
                subject: "Password Reset",
                html: `<p>We have heard that you lost your password, Kindly use the OTP below to reset your password</p> This OTP expires in 60 minutes <p><b>${otp}</b></p>`
            };

            const saltRounds = 10;
            bcrypt
                .hash(otp, saltRounds)
                .then(hashedResetString => {
                    const newPasswordReset = new PasswordReset({
                        userId: _id,
                        otp: hashedResetString,
                        expiresAt: Date.now() + 3600000
                    })
                    newPasswordReset
                        .save()
                        .then(() => {
                            transporter
                                .sendMail(mailOptions)
                                .then(() => {
                                    res.status(200).json({
                                        status: "PENDING",
                                        message: "Email Sent",
                                        userid: _id
                                    })
                                })
                                .catch((error) => {
                                    res.status(500).json({
                                        status: "Failed",
                                        message: "Reset Password failed"
                                    })
                                })
                        })
                        .catch(error => {
                            res.status(500).json({
                                status: "Failed",
                                message: "Could not save Password Reset Data"
                            })
                        })
                })
                .catch(error => {
                    res.status(500).json({
                        status: "Failed",
                        message: "Error Occured while trying to hash the password"
                    })
                })
        })
        .catch((error) => {
            res.status(500).json({
                status: "Failed",
                message: "Clearing exixsting password Failed"
            })
        })
}

module.exports.resetpassword = async (req, res) => {
    let { email, otp, newPassword } = req.body;
    PasswordReset.find({ email })
        .then(result => {
            if (result.length > 0) {
                const { expiresAt } = result[0];
                const hashedResetString = result[0].otp
                if (expiresAt < Date.now()) {
                    PasswordReset
                        .deleteOne({ userId })
                        .then(() => {
                            res.status(500).json({
                                status: "Failed",
                                message: "Password reset link has expired"
                            })
                        })
                        .catch(error => {
                            res.status(500).json({
                                status: "Failed",
                                message: "Clearing password reset failed"
                            })
                        })
                } else {
                    bcrypt.compare(otp, hashedResetString)
                        .then((result) => {
                            if (result) {
                                const saltRounds = 10
                                bcrypt
                                    .hash(newPassword, saltRounds)
                                    .then(hashedNewPassword => {
                                        User
                                            .updateOne({ _id: userId }, { password: hashedNewPassword })
                                            .then(() => {
                                                PasswordReset
                                                    .deleteOne({ userId })
                                                    .then(() => {
                                                        res.status(200).json({
                                                            status: "Success",
                                                            message: "Password Has been reset successfully"
                                                        })
                                                    })
                                                    .catch(error => {
                                                        res.status(500).json({
                                                            status: "Failed",
                                                            message: "An Error occured while finalizing password reset"
                                                        })
                                                    })
                                            })
                                            .catch(error => {
                                                res.status(500).json({
                                                    status: "Failed",
                                                    message: "Update user password failed"
                                                })
                                            })
                                    })
                                    .catch(error => {
                                        res.status(500).json({
                                            status: "Failed",
                                            message: "An Error occur while hashing new Password"
                                        })
                                    })
                            } else {
                                res.status(500).json({
                                    status: "Failed",
                                    message: "Invalid Password reset detail passed"
                                })
                            }
                        })
                        .catch(error => {
                            res.status(500).json({
                                status: "Failed",
                                message: "Comparing Password Reset String Failed"
                            })
                        })
                }
            } else {
                res.status(500).json({
                    status: "Failed",
                    message: "Password reset request not found"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                status: "Failed",
                message: "Checking for existing Password"
            })
        })

}


module.exports.updateuser = async (req, res) => {
    var id = req.params.id
    var first_name = req.body.firstname
    var last_name = req.body.lastname
    var location_location = req.body.location
    var birthday_birthday = req.body.birthday
    var gender_gender = req.body.gender

    User.findById(id, function (err, data) {
        data.firstname = first_name ? first_name : data.firstname
        data.lastname = last_name ? last_name : data.lastname
        data.location = location_location ? location_location : data.location
        data.birthday = birthday_birthday ? birthday_birthday : data.birthday
        data.gender = gender_gender ? gender_gender : data.gender

        data.save()
            .then(doc => {
                res.status(200).json({
                    status: "success",
                    message: "User profile Updated Successfully",
                    data: doc

                })
                //.populate(userid)
            })
            .catch(error => {
                res.status(500).json({
                    status: "Failed",
                    message: "Error Occured whentrying to edit user"
                })
            })
    })


}

module.exports.getsingleuser = async (req, res) => {
    const usersidentity = req.params.id
    try {
        const singleID = await User.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: singleID,

        })

    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Error in Getting Users details"
        })
    }
}


module.exports.editsocial = ("/:id", async (req, res) => {
    var id = req.params.id
    //var id = req.params.userid
    var facebook_facebook = req.body.facebook
    var instagram_instagram = req.body.instagram
    var twitter_twitter = req.body.twitter
    var olx_olx = req.body.olx
    //var userid_userid = req.body.userid
    User.findById(id, function (err, data) {
        data.facebook = facebook_facebook ? facebook_facebook : data.facebook;
        data.instagram = instagram_instagram ? instagram_instagram : data.instagram;
        data.twitter = twitter_twitter ? twitter_twitter : data.twitter;
        data.olx = olx_olx ? olx_olx : data.olx;
        //data.userid = userid_userid ? userid_userid : data.userid
        data.save()
            .then(data => {
                res.status(201).json({
                    status: "success",
                    message: "Social Media Added Successfully",
                    data: data
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    status: "Failed",
                    message: "Error Occured when trying to Add User Social Links"
                })
            })

    })
})

module.exports.getallusers = async (req, res) => {

    let query = {};
    let qNew = req.query.new

    if (req.query.firstname) {
        query.firstname = req.query.firstname
    } /* else if (req.query.status) {

        query.status = req.query.status
    } */

    let total = await User.countDocuments(query);
    let page = (req.query.page) ? parseInt(req.query.page) : 1;
    let perPage = (req.query.perPage) ? parseInt(req.query.perPage) : 10;
    let skip = (page - 1) * perPage;

    query.push = ({
        $skip: skip
    });
    query.push = ({
        $limit: perPage
    })

    if (req.query.firstname) {
        query.$or = [
            { "firstname": { $regex: req.query.firstname, $options: 'i' } },

        ]
    } else if (req.query.lastname) {
        query.$or = [
            { "lastname": { $regex: req.query.lastname, $options: 'i' } },

        ]
    }


    let diplayallUsers = await User.find(query)
        .sort({ createdAt: -1 });
    if (qNew) {
        diplayallUsers = await User.find().sort({ createdAt: -1 })

    }

    /*  const counters = displayallAdvert.length
     console.log(counters) */

    return res.status(200).json({
        message: "success",
        noofUsers: diplayallUsers.length,
        data: {

            data: diplayallUsers,
            meta: {
                total: total,
                currentPage: page,
                perPage: perPage,
                totalPages: Math.ceil(total / perPage)
            }
        }
    })
}

module.exports.deleteuserbyid = async (req, res) => {
    const usersid = req.params.id
    try {
        await User.findByIdAndDelete(usersid)
        res.status(200).json({
            status: "success",
            message: "User Deleted Successfully"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            status: "Failed",
            message: "Error Occur"
        })
    }
}

module.exports.follow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { followings: req.params.id } })
                res.status(200).json("User Has been followed")
            } else {
                res.status(403).json("You have already followed this user")
            }
        } catch (error) {
            res.status(500).json(error)
            console.log(req.body.userId)
            console.log(req.params.id)
        }
    } else {
        res.status(403).json("You can not follow Yourself")
    }
}


module.exports.unfollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { followings: req.params.id } })
                res.status(200).json("User Has been unfollowed")
            } else {
                res.status(403).json("You followed this user")
            }
        } catch (error) {
            res.status(500).json(error)
            console.log(req.body.userId)
            console.log(req.params.id)
        }
    } else {
        res.status(403).json("You can not unfollow Yourself")
    }
}
