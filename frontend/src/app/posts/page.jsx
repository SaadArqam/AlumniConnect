"use client";

import { useEffect, useState } from "react";
import CreatePostForm from "@/components/posts/CreatePostForm";
import PostCard from "@/components/posts/PostCard";
import api from "@/utils/api";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await api.get("/posts");
    setPosts(data);
  };

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Create Post */}
      <CreatePostForm onPostCreated={handlePostCreated} />

      {/* Posts */}
      <div className="mt-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
