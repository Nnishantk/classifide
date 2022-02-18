const router = require('express').Router();
const { addBalance,getallbalanceHistory } = require("../Controllers/balanceController")


router.post('/add-balance/', addBalance)
router.post('/getallbalanceHistory/', getallbalanceHistory)


module.exports = router;
