const router = require("express").Router();

const { SendConversationByUser, getconversationbyuser } = require("../Controllers/conversationController")





router.post("/sentconversation", SendConversationByUser)
router.get("/getconversationbyuser/:userId", getconversationbyuser)


module.exports = router