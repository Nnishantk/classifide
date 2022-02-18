const router = require('express').Router();
const {Addstate,Displayallstates,getsinglestate,deletestate,updatestate  } = require("../Controllers/stateController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");




router.post('/addstate', Addstate)
router.get('/getallstate', Displayallstates);
router.get('/getsinglestate/:id', getsinglestate);
router.delete('/deletestate/:id', deletestate);
router.put('/updatestate/:id', updatestate);



module.exports = router;
