const { Addformcontroll, getallformcontrol, getsingleformcontrolbyid, updateformcontrol, deleteformcontrol } = require("../Controllers/formcontrollController")
const router = require("express").Router();





router.post("/Addformcontrol", Addformcontroll);
router.get("/getallformcontrol", getallformcontrol);
router.get("/getsingleformcontrolbyid/:id", getsingleformcontrolbyid);
router.put("/updateformcontrol/:id", updateformcontrol);
router.delete("/deleteformcontrol/:id", deleteformcontrol);



module.exports = router