const postService = require("./post.service");

exports.createPost = async (req, res) => {
  try {
    const { authorId, content, imageUrl, title } = req.body;
    const post = await postService.createPost(authorId, content, imageUrl, title);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const { postId } = req.params;

    console.log("Like request:", { postId, userId });

    if (!userId) {
      return res.status(400).json({ error: "UserId is required" });
    }

    const post = await postService.likePost(postId, userId);
    console.log("Post liked successfully:", post.id);
    res.json(post);
  } catch (err) {
    console.error("Like post error:", err.message);
    // Handle specific error cases
    if (err.message === "Post not found") {
      return res.status(404).json({ error: err.message });
    }
    if (err.message === "User has already liked this post") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const { postId } = req.params;

    console.log("Unlike request:", { postId, userId });

    if (!userId) {
      return res.status(400).json({ error: "UserId is required" });
    }

    const post = await postService.unlikePost(postId, userId);
    console.log("Post unliked successfully:", post.id);
    res.json(post);
  } catch (err) {
    console.error("Unlike post error:", err.message);
    // Handle specific error cases
    if (err.message === "Post not found") {
      return res.status(404).json({ error: err.message });
    }
    if (err.message === "User has not liked this post") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};
