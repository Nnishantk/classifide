const { addType, getallType, gettypebyid, editType, deletetype } = require("../Controllers/typeController")
const router = require("express").Router();

router.post("/addtype", addType);
router.get("/getalltypes", getallType);
router.get("/gettypebyid/:id", gettypebyid);
router.put("/edittype/:id", editType);
router.delete("/deletetype/:id", deletetype);

module.exports = router


