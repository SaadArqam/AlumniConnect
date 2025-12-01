const commentsService = require("./comments.service");

exports.createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { authorId, content, parentId } = req.body;

    if (!authorId) {
      return res.status(400).json({ error: "AuthorId is required" });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Comment content is required" });
    }

    const comment = await commentsService.createComment(postId, authorId, content, parentId || null);
    res.status(201).json(comment);
  } catch (err) {
    console.error("Create comment error:", err);
    if (err.message === "Parent comment not found" || err.message.includes("does not belong")) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message || "Failed to create comment" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await commentsService.getCommentsByPostId(postId);
    res.json(comments);
  } catch (err) {
    console.error("Get comments error:", err);
    res.status(500).json({ error: err.message || "Failed to fetch comments" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ error: "UserId is required" });
    }

    await commentsService.deleteComment(commentId, userId);
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Delete comment error:", err);
    if (err.message === "Comment not found") {
      return res.status(404).json({ error: err.message });
    }
    if (err.message.includes("Unauthorized")) {
      return res.status(403).json({ error: err.message });
    }
    res.status(500).json({ error: err.message || "Failed to delete comment" });
  }
};

