const { AddfeaturePackage, editPackageFeature, deletepackagefeaturebyid, getpackagefeaturebyid, getallpackagefeature } = require("../Controllers/packagefeatureController")
const router = require("express").Router();





router.post("/addfeaturepackage", AddfeaturePackage);
router.get("/getallpackagefeature", getallpackagefeature);
router.get("/getpackagefeaturebyid/:id", getpackagefeaturebyid);
router.put("/editPackageFeature/:id", editPackageFeature);
router.delete("/deletepackagefeaturebyid/:id", deletepackagefeaturebyid);



module.exports = router