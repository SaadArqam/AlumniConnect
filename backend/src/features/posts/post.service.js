const prisma = require("../../lib/prisma");

exports.createPost = async (authorId, content, imageUrl, title) => {
  return await prisma.post.create({
    data: {
      authorId,
      content,
      imageUrl,
      title: title || "",
      likedBy: [], // Initialize empty array for likes
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
      comments: {
        include: {
          author: true,
        },
      },
    },
  });
};

exports.likePost = async (postId, userId) => {
  // First, get the current post to check if user already liked it
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { likedBy: true },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  // Check if user already liked the post
  const currentLikedBy = post.likedBy || [];
  if (currentLikedBy.includes(userId)) {
    throw new Error("User has already liked this post");
  }

  // Add user to likedBy array and increment likes count
  const updatedLikedBy = [...currentLikedBy, userId];

  return await prisma.post.update({
    where: { id: postId },
    data: {
      likedBy: updatedLikedBy,
      likes: { increment: 1 },
    },
    include: {
      author: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
  });
};

exports.unlikePost = async (postId, userId) => {
  // First, get the current post to check if user liked it
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { likedBy: true },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  // Check if user has liked the post
  const currentLikedBy = post.likedBy || [];
  if (!currentLikedBy.includes(userId)) {
    throw new Error("User has not liked this post");
  }

  // Remove user from likedBy array and decrement likes count
  const updatedLikedBy = currentLikedBy.filter((id) => id !== userId);

  return await prisma.post.update({
    where: { id: postId },
    data: {
      likedBy: updatedLikedBy,
      likes: { decrement: 1 },
    },
    include: {
      author: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
  });
};
