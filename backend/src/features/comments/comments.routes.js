const express = require("express");
const router = express.Router();
const commentsController = require("./comments.controller");

// Get all comments for a post
router.get("/posts/:postId/comments", commentsController.getComments);

// Create a comment on a post
router.post("/posts/:postId/comments", commentsController.createComment);

// Delete a comment
router.delete("/comments/:commentId", commentsController.deleteComment);

module.exports = router;

