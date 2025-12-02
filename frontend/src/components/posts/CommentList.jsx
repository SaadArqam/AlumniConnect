"use client";

import CommentItem from "./CommentItem";

export default function CommentList({
  comments,
  onDelete,
  onReply,
  currentUserId,
  isNested = false,
  postId,
}) {
  if (!comments || comments.length === 0) {
    if (!isNested) {
      return (
        <div className="text-center py-4 text-sm text-slate-500">
          No comments yet. Be the first to comment!
        </div>
      );
    }
    return null;
  }

  return (
    <div className="space-y-1">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDelete={onDelete}
          onReply={onReply}
          currentUserId={currentUserId}
          isReply={isNested}
          postId={postId}
        />
      ))}
    </div>
  );
}

