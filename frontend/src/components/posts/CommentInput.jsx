"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function CommentInput({ onSubmit, isSubmitting = false }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    onSubmit(trimmedContent);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-start">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={!content.trim() || isSubmitting}
        className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Post comment"
      >
        <Send size={18} />
      </button>
    </form>
  );
}

