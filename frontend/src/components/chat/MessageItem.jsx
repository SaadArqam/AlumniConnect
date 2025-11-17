"use client";
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function MessageItem({ node, currentUserId, onReply, onToggleUpvote }) {
  const [openReply, setOpenReply] = useState(false);

  const isAuthor = node.authorId === currentUserId;
  const upvotes = node.upvotes || [];
  const hasUpvoted = currentUserId && upvotes.includes(currentUserId);

  return (
    <div className="pl-4 border-l ml-2">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">{node.author?.name?.charAt(0) || 'U'}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="font-medium text-sm">{node.author?.name || node.authorId}</div>
            <div className="text-xs text-gray-400">{formatDistanceToNow(new Date(node.createdAt), { addSuffix: true })}</div>
          </div>
          <div className="mt-1 text-gray-900 whitespace-pre-wrap">{node.content}</div>

          <div className="mt-2 flex items-center gap-4 text-sm">
            <button onClick={() => onToggleUpvote(node.id)} className={`px-2 py-1 rounded ${hasUpvoted ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
              ▲ {upvotes.length}
            </button>

            <button onClick={() => { setOpenReply(!openReply); onReply(node.id); }} className="text-gray-600">Reply</button>
            {isAuthor && <span className="text-xs text-gray-400">you</span>}
          </div>

          {openReply && (
            <div className="mt-3">
              <small className="text-gray-500">Replying to {node.author?.name || node.authorId}</small>
            </div>
          )}

          {node.children && node.children.length > 0 && (
            <div className="mt-3 space-y-3">
              {node.children.map((child) => (
                <MessageItem key={child.id} node={child} currentUserId={currentUserId} onReply={onReply} onToggleUpvote={onToggleUpvote} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
