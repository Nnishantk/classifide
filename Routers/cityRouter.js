const router = require('express').Router();
const {AddCity,Displayallcity,getsinglecity,deletecity,updatecity,getcitybystateid  } = require("../Controllers/cityController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");




router.post('/addcity', AddCity)
router.get('/Displayallcity', Displayallcity);
router.get('/getsinglecity/:id', getsinglecity);
router.get('/getcitybystateid/:stateID', getcitybystateid);
router.delete('/deletecity/:id', deletecity);
router.put('/updatecity/:id', updatecity);



module.exports = router;
