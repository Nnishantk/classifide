const router = require('express').Router();
const { adminregistration, authlogin } = require("../Controllers/authController")
const upload = require("../Middleware/imageUploader")


router.post('/registration', upload.upload.single('adminpicture'), adminregistration);
router.post('/adminlogin', authlogin);




module.exports = router;
