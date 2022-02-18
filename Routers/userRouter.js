const router = require('express').Router();
const { unfollow, follow, deleteuserbyid, getallusers, userregistration, Userlogin, forgotpassword, resetpassword, getverification, verifiedhtml, updateuser, getsingleuser, editsocial, passwordchange } = require("../Controllers/userController")
const { verifyToken, verifyTokenwithAuthorization, verifyTokenwithAdmin } = require("../Middleware/verifyToken");




router.post('/userregistration', userregistration);
router.post('/userlogin', Userlogin);
router.post('/forgotpassword', forgotpassword);
router.post('/resetpassword', resetpassword);
router.get('/getverification/:userId/:uniqueString', getverification);
router.get('/getverification', verifiedhtml);
router.get('/singleuser/:id', verifyTokenwithAdmin, getsingleuser);
router.patch('/userupdate/:id', verifyToken, updateuser);
router.patch('/socialmedia/:id', verifyToken, editsocial);
/* router.post('/changepassword', passwordchange); */
router.get('/getallusers', getallusers);
router.delete('/deleteuserbyid/:id', deleteuserbyid);
router.put('/follow/:id/follower', follow);
router.put('/unfollow/:id/follower', unfollow);




module.exports = router;
