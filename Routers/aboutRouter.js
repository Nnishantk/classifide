const router = require('express').Router();
const { Addabout, getallcontact, getsingleabout, updateAbout, deleteabout } = require("../Controllers/aboutController")



router.post('/addabout', Addabout);
router.get('/getallcontact', getallcontact);
router.get('/getsingleabout/:id', getsingleabout);
router.put('/updateabout/:id', updateAbout);
router.delete('/deleteabout/:id', deleteabout);



module.exports = router;
