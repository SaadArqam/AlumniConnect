"use client";

import { useState } from "react";
import api from "@/utils/api";

export default function CreatePostForm({ onPostCreated }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId"); // or use context if available

    const newPost = await api.post("/posts", {
      content,
      authorId: userId,
    });

    setContent("");
    onPostCreated(newPost);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-white">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded p-2"
        placeholder="Share something..."
        rows={3}
      />

      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
      >
        Post
      </button>
    </form>
  );
}
