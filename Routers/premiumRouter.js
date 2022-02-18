
const router = require("express").Router();
const { AddPremiumcategory, getallpremium, getsinglepremium, updatepremium, deletepremium } = require("../Controllers/premiumController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
const upload = require("../Middleware/imageUploader")




router.post("/AddPremiumcategory", upload.upload.single('premiumimage'), AddPremiumcategory);
router.get("/getallpremium", getallpremium);
router.get("/getsinglepremium/:id", getsinglepremium);
router.delete("/deletepremium/:id", deletepremium);
router.put("/updatepremium/:id", upload.upload.single('premiumimage'), updatepremium);

function errhandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.status(501).json({
            success: 0,
            message: err.message
        })
    }
}

router.use(errhandler);

module.exports = router