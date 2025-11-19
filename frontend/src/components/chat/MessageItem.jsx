"use client";
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import { ArrowUp, MessageSquare, Reply } from "lucide-react";

export default function MessageItem({ node, currentUserId, onReply, onToggleUpvote }) {
  const isAuthor = node.authorId === currentUserId;
  const upvotes = node.upvotes || [];
  const hasUpvoted = currentUserId && upvotes.includes(currentUserId);

  return (
    <div className="pl-4 border-l-2 border-gray-700/50 ml-2">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center text-sm font-medium text-gray-300 flex-shrink-0 shadow-inner">
          {node.author?.name?.charAt(0) || 'U'}
        </div>
        {/* Message Content */}
        <div className="flex-1 bg-gray-800/30 backdrop-blur-lg rounded-3xl p-4 border border-gray-700 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-gray-100">{node.author?.name || node.authorId}</div>
              {isAuthor && <span className="text-xs bg-blue-600/70 text-white px-3 py-1 rounded-full shadow-md">You</span>}
              <div className="text-xs text-gray-400">• {formatDistanceToNow(new Date(node.createdAt), { addSuffix: true })}</div>
            </div>
          </div>

          <div className="text-gray-200 whitespace-pre-wrap mb-3">{node.content}</div>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <button
              onClick={() => onToggleUpvote(node.id)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition duration-200 ease-in-out shadow-md
                ${hasUpvoted ? 'bg-blue-600/70 text-white' : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300'}`}
              aria-label="Toggle upvote"
            >
              <ArrowUp size={16} />
              <span>{upvotes.length}</span>
            </button>

            <button
              onClick={() => onReply(node.id)}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 transition duration-200 ease-in-out shadow-md"
              aria-label="Reply to message"
            >
              <MessageSquare size={16} />
              <span>Reply</span>
            </button>
          </div>

          {node.children && node.children.length > 0 && (
            <div className="mt-4 pl-6 border-l-2 border-gray-700/50 space-y-4">
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

MessageItem.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    author: PropTypes.shape({ name: PropTypes.string }),
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
    parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    upvotes: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    children: PropTypes.array,
  }).isRequired,
  currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onReply: PropTypes.func.isRequired,
  onToggleUpvote: PropTypes.func.isRequired,
};
