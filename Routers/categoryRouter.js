const router = require('express').Router();
const { addcategory, editCategory, deletecategory, getcategorybyid, getallcategory, } = require("../Controllers/categoryController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");
const upload = require("../Middleware/imageUploader")

router.post('/addcategory', upload.upload.single('categoryimage'), addcategory)
router.get('/getallcategory', getallcategory);
router.get('/singlecategory/:id', getcategorybyid);
router.delete('/deletecategory/:id', deletecategory);
router.put('/editcategory/:id', upload.upload.single('categoryimage'), editCategory);

module.exports = router;
