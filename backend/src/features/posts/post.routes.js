const express = require("express");
const router = express.Router();
const postController = require("./post.controller");

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);

router.post("/:postId/like", postController.likePost);
router.post("/:postId/unlike", postController.unlikePost);

module.exports = router;
