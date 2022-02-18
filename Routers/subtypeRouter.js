const { addSubType, getallsubType, getsubtypebyid, editsubType, deleteSubtype } = require("../Controllers/subtypeController")
const router = require("express").Router();

router.post("/addsubtype", addSubType);
router.get("/getallsubtypes", getallsubType);
router.get("/getsubtypebyid/:id", getsubtypebyid);
router.put("/editsubtype/:id", editsubType);
router.delete("/deleteSubtype/:id", deleteSubtype);

module.exports = router


