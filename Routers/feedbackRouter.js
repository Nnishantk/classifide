const router = require("express").Router()
const { getmessagesbysender,givefeedback, getallfeedback, getallfeedbackbyid, deletefeedbackbyid,getmessagesbyreceivers,getfeedbacklink } = require("../Controllers/feedbackController")



router.post("/addfeedback", givefeedback)
router.get("/getallfeedback", getallfeedback)
router.get("/getallfeedbackbyid/:id", getallfeedbackbyid)
router.delete("/deletefeedbackbyid/:id", deletefeedbackbyid)
router.get("/getmessagesbyreceivers/:receiverId", getmessagesbyreceivers)
router.get("/getfeedbacklink/:userId", getfeedbacklink)
router.get("/getmessagesbysender/:userId", getmessagesbysender)


module.exports = router


