const express = require("express");
const router = express.Router();
const authMiddleware = require("../auth/auth.service");
const connectionsController = require("./connections.controller");

// Send a new connection request
router.post("/", authMiddleware, connectionsController.sendRequest);

// Accept / Decline a request
router.post("/:id/accept", authMiddleware, connectionsController.acceptRequest);
router.post("/:id/decline", authMiddleware, connectionsController.declineRequest);

// List requests
router.get("/incoming", authMiddleware, connectionsController.getIncomingRequests);
router.get("/sent", authMiddleware, connectionsController.getSentRequests);

module.exports = router;


