const router = require("express").Router();

const { SendMessageByUser, getconversation, GetconversationbySenderid } = require("../Controllers/messageController")





router.post("/SendMessageByUser", SendMessageByUser)
router.get("/getconversation/:conversationId", getconversation)
router.get("/getconversationbysenderid/:senderId", GetconversationbySenderid)


module.exports = router