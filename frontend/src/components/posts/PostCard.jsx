"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import api from "@/utils/api";

export default function PostCard({ post, onLike, onCommentAdded }) {
  const hasImage = post.imageUrl && post.imageUrl.trim();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes ?? 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const currentUserId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId && post.likedBy) {
      setIsLiked(post.likedBy.includes(userId));
    }
    setLikesCount(post.likes ?? 0);
    setComments(post.comments || []);
  }, [post]);

  const handleLikeClick = () => {
    if (onLike) {
      onLike(post.id);
      // Don't do optimistic updates - let the parent handle state updates
      // This prevents state mismatches
    }
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
    // Load comments if not already loaded
    if (!showComments && comments.length === 0) {
      loadComments();
    }
  };

  const loadComments = async () => {
    try {
      const fetchedComments = await api.get(`/api/posts/${post.id}/comments`);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Failed to load comments:", error);
    }
  };

  const handleCommentSubmit = async (content) => {
    if (!currentUserId) {
      alert("Please log in to comment");
      return;
    }

    try {
      setIsSubmittingComment(true);
      const newComment = await api.post(`/api/posts/${post.id}/comments`, {
        authorId: currentUserId,
        content,
      });

      setComments((prev) => [...prev, newComment]);
      if (onCommentAdded) {
        onCommentAdded(post.id);
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
      alert(error.message || "Failed to add comment");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleReply = async (parentId, content) => {
    if (!currentUserId) {
      alert("Please log in to reply");
      return;
    }

    try {
      const newReply = await api.post(`/api/posts/${post.id}/comments`, {
        authorId: currentUserId,
        content,
        parentId,
      });

      // Update comments state - need to find the parent and add the reply
      setComments((prev) => {
        const updateCommentWithReply = (comments) => {
          return comments.map((comment) => {
            if (comment.id === parentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newReply],
              };
            }
            if (comment.replies && comment.replies.length > 0) {
              return {
                ...comment,
                replies: updateCommentWithReply(comment.replies),
              };
            }
            return comment;
          });
        };
        return updateCommentWithReply(prev);
      });

      if (onCommentAdded) {
        onCommentAdded(post.id);
      }
    } catch (error) {
      console.error("Failed to add reply:", error);
      alert(error.message || "Failed to add reply");
      throw error;
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!currentUserId) return;

    if (!confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      await api.delete(`/api/comments/${commentId}`, {
        userId: currentUserId,
      });

      // Remove comment from state, handling nested structure
      const removeComment = (comments) => {
        return comments
          .filter((c) => c.id !== commentId)
          .map((c) => {
            if (c.replies && c.replies.length > 0) {
              return {
                ...c,
                replies: removeComment(c.replies),
              };
            }
            return c;
          });
      };

      setComments((prev) => removeComment(prev));
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert(error.message || "Failed to delete comment");
    }
  };

  return (
    <article className="bg-white/80 backdrop-blur-lg border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-700">
            {post.author?.name?.[0]?.toUpperCase() || "A"}
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm">{post.author?.name || "Anonymous"}</p>
            <p className="text-xs text-slate-500">
              {post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : "Just now"}
            </p>
          </div>
        </div>
      </header>

      {/* Image (if exists) */}
      {hasImage && (
        <div className="w-full bg-slate-100">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full object-cover max-h-[500px]"
          />
        </div>
      )}

      {/* Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLikeClick}
              className={`flex items-center gap-1.5 transition-colors ${
                isLiked
                  ? "text-red-500 hover:text-red-600"
                  : "text-slate-700 hover:text-red-500"
              }`}
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <Heart
                size={22}
                className={`hover:scale-110 transition-transform ${
                  isLiked ? "fill-current" : ""
                }`}
              />
              <span className="text-sm font-medium">{likesCount}</span>
            </button>
            <button
              onClick={handleCommentClick}
              className={`flex items-center gap-1.5 transition-colors ${
                showComments
                  ? "text-blue-500 hover:text-blue-600"
                  : "text-slate-700 hover:text-slate-900"
              }`}
              aria-label="Comment"
            >
              <MessageCircle size={22} className="hover:scale-110 transition-transform" />
              {comments.length > 0 && (
                <span className="text-sm font-medium">{comments.length}</span>
              )}
            </button>
            <button
              className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 transition-colors"
              aria-label="Share"
            >
              <Share2 size={22} className="hover:scale-110 transition-transform" />
            </button>
          </div>
          <button
            className="text-slate-700 hover:text-slate-900 transition-colors"
            aria-label="Save"
          >
            <Bookmark size={22} className="hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-1">
          {post.title && (
            <h3 className="font-semibold text-slate-900">{post.title}</h3>
          )}
          {post.content && (
            <p className="text-slate-700 text-sm whitespace-pre-line">{post.content}</p>
          )}
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="pt-3 border-t border-slate-200 space-y-3">
            <CommentList
              comments={comments}
              onDelete={handleDeleteComment}
              onReply={handleReply}
              currentUserId={currentUserId}
              postId={post.id}
            />
            <CommentInput onSubmit={handleCommentSubmit} isSubmitting={isSubmittingComment} />
          </div>
        )}
      </div>
    </article>
  );
}
