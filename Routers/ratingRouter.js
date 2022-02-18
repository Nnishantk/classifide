const { GiveRating, getratingbyid } = require("../Controllers/ratingController")
const router = require("express").Router();

router.post("/rating", GiveRating)
router.post("/getratingbyid/:id", getratingbyid)


module.exports = router