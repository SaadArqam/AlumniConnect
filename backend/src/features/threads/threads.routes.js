const express = require("express");
const router = express.Router();
const controller = require("./threads.controller");
const verifyJWT = require("../auth/auth.service");

router.post("/", verifyJWT, controller.createThread);
router.get("/", controller.getThreads);
router.get("/:threadId/messages", controller.getThreadMessages);

module.exports = router;