const postService = require("./post.service");

exports.createPost = async (req, res) => {
  try {
    const { authorId, content, imageUrl } = req.body;
    const post = await postService.createPost(authorId, content, imageUrl);
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

    const post = await postService.likePost(postId, userId);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const { postId } = req.params;

    const post = await postService.unlikePost(postId, userId);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
