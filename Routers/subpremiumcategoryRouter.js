const { addSubpremiumCategory, editsubpremiumCategory, deletesubpremiumcategory, getsubpremiumcategorybyid, getallsubpremiumcategory } = require("../Controllers/subpremiumcategoryController")
const router = require("express").Router();
const upload = require("../Middleware/imageUploader")




router.post("/addsubpremiumcategory", upload.upload.single('subcategorypremiumimage'), addSubpremiumCategory);
router.get("/getallsubpremiumcategory", getallsubpremiumcategory);
router.get("/getsubpremiumcategorybyid/:id", getsubpremiumcategorybyid);
router.put("/editsubpremiumcategory/:id", upload.upload.single('subcategorypremiumimage'), editsubpremiumCategory);
router.delete("/deletesubpremiumcategory/:id", deletesubpremiumcategory);



module.exports = router