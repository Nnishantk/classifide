const { Addrate, calculation } = require("../Controllers/newratingController")
const router = require("express").Router();

router.post("/addrate", Addrate)
router.get("/calculation", calculation)
/* router.post("/getratingbyid/:id", getratingbyid) */


module.exports = router