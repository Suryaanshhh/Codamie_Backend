const express = require("express");
const authentication = require("../Middlewares/authentication.js")
const router = express.Router();
const messageController = require("../Controller/message.js")

router.get('/:recipientId',authentication, messageController.getMessages);


router.put('/read/:senderId', authentication, messageController.markMessagesAsRead);

module.exports = router;
