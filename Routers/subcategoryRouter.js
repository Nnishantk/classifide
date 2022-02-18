const { addSubCategory, getallsubCategory, getsubCategorybyid, editsubCategory, deleteSubcategory } = require("../Controllers/subcategoryController")
const router = require("express").Router();
const upload = require("../Middleware/imageUploader")


router.post("/addsubcategory", upload.upload.single('subcategoryimage'), addSubCategory);
router.get("/getallsubCategory", getallsubCategory);
router.get("/getsubCategorybyid/:id", getsubCategorybyid);
router.put("/editsubCategory/:id", upload.upload.single('subcategoryimage'), editsubCategory);
router.delete("/deleteSubcategory/:id", deleteSubcategory);


module.exports = router