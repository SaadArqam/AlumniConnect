"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function PostCard({ post, onLike }) {
  const hasImage = post.imageUrl && post.imageUrl.trim();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes ?? 0);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId && post.likedBy) {
      setIsLiked(post.likedBy.includes(userId));
    }
    setLikesCount(post.likes ?? 0);
  }, [post]);

  const handleLikeClick = () => {
    if (onLike) {
      onLike(post.id);
      // Don't do optimistic updates - let the parent handle state updates
      // This prevents state mismatches
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
              className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 transition-colors"
              aria-label="Comment"
            >
              <MessageCircle size={22} className="hover:scale-110 transition-transform" />
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
      </div>
    </article>
  );
}
