const prisma = require("../../lib/prisma");

exports.createPost = async (authorId, content, imageUrl) => {
  return await prisma.post.create({
    data: {
      authorId,
      content,
      imageUrl,
    },
    include: {
      author: true,
    },
  });
};

exports.getAllPosts = async () => {
  return await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      comments: true,
    },
  });
};

exports.likePost = async (postId, userId) => {
  return await prisma.post.update({
    where: { id: postId },
    data: {
      likes: { increment: 1 },
    },
  });
};

exports.unlikePost = async (postId, userId) => {
  return await prisma.post.update({
    where: { id: postId },
    data: {
      likes: { decrement: 1 },
    },
  });
};
