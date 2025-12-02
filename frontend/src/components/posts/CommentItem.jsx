"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import CommentInput from "./CommentInput";

export default function CommentItem({
  comment,
  onDelete,
  onReply,
  currentUserId,
  isReply = false,
  postId,
}) {
  const canDelete = currentUserId && comment.authorId === currentUserId;
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const handleReplyClick = () => {
    if (!currentUserId) {
      alert("Please log in to reply");
      return;
    }
    setShowReplyInput(!showReplyInput);
  };

  const handleReplySubmit = async (content) => {
    if (onReply) {
      setIsSubmittingReply(true);
      try {
        await onReply(comment.id, content);
        setShowReplyInput(false);
      } catch (error) {
        console.error("Failed to submit reply:", error);
      } finally {
        setIsSubmittingReply(false);
      }
    }
  };

  return (
    <div className={`${isReply ? "ml-8 mt-2" : ""}`}>
      <div className="flex gap-3 py-2">
        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-700 flex-shrink-0">
          {comment.author?.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="bg-slate-50 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm text-slate-900">
                {comment.author?.name || "Anonymous"}
              </span>
              {comment.parent && (
                <span className="text-xs text-slate-500">
                  replying to {comment.parent.author?.name}
                </span>
              )}
              <span className="text-xs text-slate-500">
                {comment.createdAt
                  ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })
                  : "just now"}
              </span>
            </div>
            <p className="text-sm text-slate-700 whitespace-pre-wrap">{comment.content}</p>
          </div>
          <div className="flex items-center gap-3 mt-1">
            {!isReply && (
              <button
                onClick={handleReplyClick}
                className="text-xs text-blue-500 hover:text-blue-600"
              >
                Reply
              </button>
            )}
            {canDelete && (
              <button
                onClick={() => onDelete?.(comment.id)}
                className="text-xs text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            )}
          </div>
          {showReplyInput && (
            <div className="mt-2">
              <CommentInput
                onSubmit={handleReplySubmit}
                isSubmitting={isSubmittingReply}
              />
            </div>
          )}
        </div>
      </div>
      {/* Render nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 mt-2 space-y-1">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onDelete={onDelete}
              onReply={onReply}
              currentUserId={currentUserId}
              isReply={true}
              postId={postId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

