"use client";

import { useState } from "react";
import api from "@/utils/api";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes);

  const handleLike = async () => {
    const userId = localStorage.getItem("userId");

    const updatedPost = await api.post(`/posts/${post.id}/like`, { userId });

    setLikes(updatedPost.likes);
  };

  return (
    <div className="border p-4 rounded mb-4 bg-white">
      <div className="font-bold">{post.author?.name}</div>

      <p className="mt-1">{post.content}</p>

      <button
        onClick={handleLike}
        className="mt-2 text-blue-500 text-sm flex items-center"
      >
        ❤️ {likes}
      </button>
    </div>
  );
}
