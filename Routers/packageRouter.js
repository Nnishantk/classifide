const { getpackagesbysubpremiumcategoryid, AddPackage, editpackage, deletepackagebyid, getpackagebyid, getallpackage, packagecalculator } = require("../Controllers/packageController")
const router = require("express").Router();





router.post("/addpackage", AddPackage);
router.get("/getallpackage", getallpackage);
router.get("/getpackagebyid/:id", getpackagebyid);
router.get("/packagecalculator/:subpremiumcategoryId", packagecalculator);
router.get("/getpackagesbysubpremiumcategoryid/:subpremiumcategoryId", getpackagesbysubpremiumcategoryid);
router.put("/editpackage/:id", editpackage);
router.delete("/deletepackagebyid/:id", deletepackagebyid);




module.exports = router