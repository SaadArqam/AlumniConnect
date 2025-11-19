"use client";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { ArrowUp, MessageSquare, Reply } from "lucide-react";

export default function MessageItem({ node, currentUserId, onReply, onToggleUpvote }) {
  const isAuthor = node.authorId === currentUserId;
  const upvotes = node.upvotes || [];
  const hasUpvoted = currentUserId && upvotes.includes(currentUserId);

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md mb-4 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="font-semibold text-blue-400">{node.author?.name || node.authorId}</div>
          {isAuthor && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">You</span>}
          <div className="text-xs text-gray-500">• {formatDistanceToNow(new Date(node.createdAt), { addSuffix: true })}</div>
        </div>
        {/* Potentially add user flair here */}
      </div>

      <div className="text-gray-200 whitespace-pre-wrap mb-3">{node.content}</div>

      <div className="flex items-center gap-4 text-sm text-gray-400">
        <button
          onClick={() => onToggleUpvote(node.id)}
          className={`flex items-center gap-1 p-1 rounded-full transition duration-200 ease-in-out
            ${hasUpvoted ? 'text-blue-400 bg-blue-900/30' : 'hover:bg-gray-700'}`}
          aria-label="Toggle upvote"
        >
          <ArrowUp size={16} />
          <span>{upvotes.length}</span>
        </button>

        <button
          onClick={() => onReply(node.id)}
          className="flex items-center gap-1 p-1 rounded-full hover:bg-gray-700 transition duration-200 ease-in-out"
          aria-label="Reply to message"
        >
          <MessageSquare size={16} />
          <span>Reply</span>
        </button>
      </div>

      {node.children && node.children.length > 0 && (
        <div className="mt-4 pl-6 border-l-2 border-gray-700 space-y-4">
          {node.children.map((child) => (
            <MessageItem key={child.id} node={child} currentUserId={currentUserId} onReply={onReply} onToggleUpvote={onToggleUpvote} />
          ))}
        </div>
      )}
    </div>
  );
}
