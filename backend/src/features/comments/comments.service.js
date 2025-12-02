const commentsRepository = require("./comments.repository");

exports.createComment = async (postId, authorId, content, parentId = null) => {
  if (!content || !content.trim()) {
    throw new Error("Comment content is required");
  }

  // If parentId is provided, validate that the parent comment exists and belongs to the same post
  if (parentId) {
    const parentComment = await require("../../lib/prisma").comment.findUnique({
      where: { id: parentId },
      select: { postId: true },
    });

    if (!parentComment) {
      throw new Error("Parent comment not found");
    }

    if (parentComment.postId !== postId) {
      throw new Error("Parent comment does not belong to this post");
    }
  }

  return await commentsRepository.createComment(postId, authorId, content.trim(), parentId);
};

exports.getCommentsByPostId = async (postId) => {
  return await commentsRepository.getCommentsByPostId(postId);
};

exports.deleteComment = async (commentId, userId) => {
  return await commentsRepository.deleteComment(commentId, userId);
};

