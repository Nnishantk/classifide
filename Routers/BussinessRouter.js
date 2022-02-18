const router = require('express').Router();
const { addBussiness,getallCompony,getcomponybyid,deleteBusiness,updateBussiness } = require("../Controllers/BusinessInfoController")

router.post('/addbussiness', addBussiness);
router.get('/getall-compony', getallCompony);
router.get('/get-singel-compony/:id', getcomponybyid);
router.get('/delete-singel-compony/:id', deleteBusiness);
router.patch('/delete-edit-compony/:id', updateBussiness);


module.exports = router;
