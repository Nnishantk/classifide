const router = require('express').Router();
const { addadvert, EditAdvert, GetallAdvert, GetAdvertbyID, DeleteAdvert, GetAdvertbyUserID, updateusersplans, approveadvert } = require("../Controllers/advertController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
const upload = require("../Middleware/imageUploader")



router.post('/addadvert/', upload.upload.array('advertimage', 4), addadvert)
router.get('/getalladvert', GetallAdvert);
router.get('/getadvertbyid/:id', GetAdvertbyID);
router.get('/GetAdvertbyUserID/:user_id', GetAdvertbyUserID);
router.delete('/deleteadvert/:id', DeleteAdvert);
router.put('/editadvert/:id', upload.upload.array('advertimage', 4), EditAdvert);
router.put('/upgradeplan/:id', updateusersplans);
router.patch('/approveadvert/:id', approveadvert);


module.exports = router;
