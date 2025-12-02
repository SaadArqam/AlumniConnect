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

  const handleCommentAdded = async (postId) => {
    // Reload posts to get updated comment count
    try {
      const data = await api.get("/posts");
      setPosts(data);
    } catch (error) {
      console.error("Failed to reload posts:", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User not logged in");
        alert("Please log in to like posts");
        return;
      }

      // Get current post state from the posts array
      const currentPost = posts.find((p) => p.id === postId);
      if (!currentPost) {
        console.error("Post not found");
        return;
      }

      // Check if user already liked it - handle case where likedBy might be undefined
      const likedBy = currentPost.likedBy || [];
      const isLiked = likedBy.includes(userId);

      let updatedPost;
      if (isLiked) {
        // User already liked, so unlike it
        updatedPost = await api.post(`/posts/${postId}/unlike`, { userId });
      } else {
        // User hasn't liked, so like it
        updatedPost = await api.post(`/posts/${postId}/like`, { userId });
      }
      
      // Update the post in the posts array
      setPosts((prev) =>
        prev.map((post) => (post.id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error("Failed to like/unlike post:", error);
      // Silently handle "already liked" or "not liked" errors - they're expected in edge cases
      if (!error.message.includes("already liked") && !error.message.includes("not liked")) {
        alert(error.message || "Failed to like post");
      }
      // Reload posts to sync state if there was an error
      loadPosts();
    }
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
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onCommentAdded={handleCommentAdded}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
