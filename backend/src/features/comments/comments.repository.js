const prisma = require("../../lib/prisma");

exports.createComment = async (postId, authorId, content, parentId = null) => {
  return await prisma.comment.create({
    data: {
      postId,
      authorId,
      content,
      parentId: parentId || null,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          profilePic: true,
        },
      },
      parent: {
        select: {
          id: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};

exports.getCommentsByPostId = async (postId) => {
  // Get all top-level comments (no parentId) with their nested replies
  const comments = await prisma.comment.findMany({
    where: {
      postId,
      parentId: null, // Only top-level comments
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          profilePic: true,
        },
      },
      replies: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              profilePic: true,
            },
          },
          parent: {
            select: {
              id: true,
              author: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return comments;
};

exports.deleteComment = async (commentId, userId) => {
  // First check if the comment exists and belongs to the user
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      replies: true,
    },
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.authorId !== userId) {
    throw new Error("Unauthorized: You can only delete your own comments");
  }

  // If comment has replies, we should either delete them too or prevent deletion
  // For now, we'll delete the comment and its replies (cascade delete)
  if (comment.replies && comment.replies.length > 0) {
    // Delete all replies first
    await prisma.comment.deleteMany({
      where: { parentId: commentId },
    });
  }

  return await prisma.comment.delete({
    where: { id: commentId },
  });
};

