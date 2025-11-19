"use client";
import React from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { ArrowUp, MessageSquare, Reply } from "lucide-react";

export default function MessageItem({ node, currentUserId, onReply, onToggleUpvote }) {
  const isAuthor = node.authorId === currentUserId;
  const upvotes = node.upvotes || [];
  const hasUpvoted = currentUserId && upvotes.includes(currentUserId);

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-lg p-4 shadow-sm mb-4 border border-blue-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="font-semibold text-blue-700">{node.author?.name || node.authorId}</div>
          {isAuthor && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">You</span>}
          <div className="text-xs text-blue-600">• {formatDistanceToNow(new Date(node.createdAt), { addSuffix: true })}</div>
        </div>
        {/* Potentially add user flair here */}
      </div>

      <div className="text-gray-900 whitespace-pre-wrap mb-3">{node.content}</div>

      <div className="flex items-center gap-4 text-sm">
        <button
          onClick={() => onToggleUpvote(node.id)}
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border transition ${hasUpvoted ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-blue-200 text-blue-700 hover:bg-blue-50'}`}
          aria-label="Toggle upvote"
        >
          <ArrowUp size={16} />
          <span>{upvotes.length}</span>
        </button>

        <button
          onClick={() => onReply(node.id)}
          className="inline-flex items-center gap-1 text-blue-700 hover:underline"
          aria-label="Reply to message"
        >
          <MessageSquare size={16} />
          <span>Reply</span>
        </button>
      </div>

      {node.children && node.children.length > 0 && (
        <div className="mt-4 pl-6 border-l-2 border-blue-200 space-y-4">
          {node.children.map((child) => (
            <MessageItem key={child.id} node={child} currentUserId={currentUserId} onReply={onReply} onToggleUpvote={onToggleUpvote} />
          ))}
        </div>
      )}
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
    upvotes: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    children: PropTypes.array,
  }).isRequired,
  currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onReply: PropTypes.func.isRequired,
  onToggleUpvote: PropTypes.func.isRequired,
};
