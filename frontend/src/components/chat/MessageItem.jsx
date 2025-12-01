"use client";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import { ArrowUp, MessageSquare, Trash2 } from "lucide-react";

export default function MessageItem({ node, currentUserId, onReply, onToggleUpvote, onDelete }) {
  const isAuthor = node.authorId === currentUserId;
  const upvotes = node.upvotes || [];
  const hasUpvoted = currentUserId && upvotes.includes(currentUserId);

  return (
    <div className="mb-4">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-700 flex-shrink-0">
          {node.author?.name?.charAt(0) || 'U'}
        </div>
        {/* Message Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="font-medium text-slate-900 text-sm">{node.author?.name || node.authorId}</div>
            {isAuthor && <span className="text-xs bg-slate-900 text-white px-2 py-0.5 rounded-full">You</span>}
            <div className="text-xs text-slate-500">• {formatDistanceToNow(new Date(node.createdAt), { addSuffix: true })}</div>
          </div>

          <div className={`max-w-2xl p-3 rounded-2xl ${isAuthor
            ? 'bg-slate-900 text-white'
            : 'bg-white/90 backdrop-blur-sm text-slate-900 border border-slate-200'
            }`}>
            <div className="whitespace-pre-wrap text-sm">{node.content}</div>
          </div>

          <div className="flex items-center gap-3 mt-2 text-sm text-slate-600">
            <button
              onClick={() => onToggleUpvote(node.id)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${hasUpvoted
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              aria-label="Toggle upvote"
            >
              <ArrowUp size={14} />
              <span className="text-xs">{upvotes.length}</span>
            </button>

            <button
              onClick={() => onReply(node.id)}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
              aria-label="Reply to message"
            >
              <MessageSquare size={14} />
              <span className="text-xs">Reply</span>
            </button>

            {isAuthor && (
              <button
                onClick={() => onDelete(node.id)}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-all"
                aria-label="Delete message"
              >
                <Trash2 size={14} />
                <span className="text-xs">Delete</span>
              </button>
            )}
          </div>

          {node.children && node.children.length > 0 && (
            <div className="mt-4 pl-6 border-l-2 border-slate-200 space-y-4">
              {node.children.map((child) => (
                <MessageItem key={child.id} node={child} currentUserId={currentUserId} onReply={onReply} onToggleUpvote={onToggleUpvote} onDelete={onDelete} />
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
  onDelete: PropTypes.func.isRequired,
};
