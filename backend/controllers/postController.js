const prisma = require("../src/lib/prisma");

function sendError(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
}

async function createPost(req, res) {
  try {
    const { authorId, title, content, imageUrl } = req.body;

    if (!authorId || !title || !content) {
      return sendError(res, 400, "authorId, title and content are required");
    }

    const post = await prisma.post.create({
      data: {
        authorId,
        title,
        content,
        imageUrl: imageUrl || null,
      },
      include: { author: true },
    });

    return res.status(201).json(post);
  } catch (error) {
    console.error("createPost error", error);
    return sendError(res, 500, "Failed to create post");
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: true },
    });

    return res.json(posts);
  } catch (error) {
    console.error("getAllPosts error", error);
    return sendError(res, 500, "Failed to fetch posts");
  }
}

async function getPostById(req, res) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: { author: true },
    });

    if (!post) {
      return sendError(res, 404, "Post not found");
    }

    return res.json(post);
  } catch (error) {
    console.error("getPostById error", error);
    return sendError(res, 500, "Failed to fetch post");
  }
}

async function likePost(req, res) {
  try {
    const { id } = req.params;

    const updated = await prisma.post.update({
      where: { id },
      data: {
        likes: { increment: 1 },
      },
      include: { author: true },
    });

    return res.json(updated);
  } catch (error) {
    console.error("likePost error", error);
    return sendError(res, 500, "Failed to like post");
  }
}

async function deletePost(req, res) {
  try {
    const { id } = req.params;

    await prisma.post.delete({
      where: { id },
    });

    return res.json({ message: "Post deleted" });
  } catch (error) {
    console.error("deletePost error", error);
    if (error.code === "P2025") {
      return sendError(res, 404, "Post not found");
    }
    return sendError(res, 500, "Failed to delete post");
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  likePost,
  deletePost,
};
