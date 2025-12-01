"use client";

import { useState } from "react";
import { Image, Smile } from "lucide-react";
import api from "@/utils/api";

export default function CreatePostForm({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showImageInput, setShowImageInput] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const authorId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

    if (!token || !authorId) {
      setError("You must be logged in to post.");
      return;
    }

    if (!content.trim()) {
      setError("Content is required.");
      return;
    }

    try {
      setSubmitting(true);
      const post = await api.post("/posts", {
        authorId,
        title: title.trim() || "Untitled",
        content: content.trim(),
        imageUrl: imageUrl.trim() || undefined,
      });
      setTitle("");
      setContent("");
      setImageUrl("");
      setShowImageInput(false);
      onPostCreated?.(post);
    } catch (err) {
      setError(err.message || "Failed to create post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg border border-slate-200 rounded-2xl p-4 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* User Avatar + Input */}
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-700 flex-shrink-0">
            U
          </div>
          <div className="flex-1 space-y-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none resize-none text-sm"
              placeholder="What's on your mind?"
              rows={3}
            />

            {/* Title input (optional) */}
            {title !== "" || content.length > 50 ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="Add a title (optional)"
              />
            ) : null}

            {/* Image URL input */}
            {showImageInput && (
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="Paste image URL"
              />
            )}
          </div>
        </div>

        {error && <p className="text-sm text-red-600 px-13">{error}</p>}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowImageInput(!showImageInput)}
              className={`p-2 rounded-lg transition-colors ${showImageInput ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              aria-label="Add image"
            >
              <Image size={20} />
            </button>
            <button
              type="button"
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Add emoji"
            >
              <Smile size={20} />
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="px-5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm"
          >
            {submitting ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
