const express = require("express");
const router = express.Router();
const chatController = require("./chat.controller");
const verifyJWT = require("../auth/auth.service");

// Protected
router.post("/", verifyJWT, chatController.createThread);
router.get("/", verifyJWT, chatController.getThreads);
router.get("/:threadId/messages", verifyJWT, chatController.getMessages);
router.post("/:threadId/messages", verifyJWT, chatController.createMessage);
router.post("/messages/:messageId/upvote", verifyJWT, chatController.toggleUpvote);
router.delete("/messages/:messageId", verifyJWT, chatController.deleteMessage);

module.exports = router;
