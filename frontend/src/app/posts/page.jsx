"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import CreatePostForm from "@/components/posts/CreatePostForm";
import PostCard from "@/components/posts/PostCard";
import api from "@/utils/api";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await api.get("/posts");
      setPosts(data);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 pb-8">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          {/* Create Post */}
          <CreatePostForm onPostCreated={handlePostCreated} />

          {/* Posts Feed */}
          {loading ? (
            <div className="text-center py-12 text-slate-500">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 mb-2">No posts yet</p>
              <p className="text-sm text-slate-400">Be the first to share something!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
