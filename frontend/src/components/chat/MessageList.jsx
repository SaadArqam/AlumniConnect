"use client";
import React, { useEffect, useRef, useMemo } from "react";
import MessageItem from "./MessageItem";
import PropTypes from "prop-types";

function buildTree(list) {
  const map = {};
  list.forEach((m) => (map[m.id] = { ...m, children: [] }));
  const roots = [];
  list.forEach((m) => {
    if (m.parentId) {
      const parent = map[m.parentId];
      if (parent) parent.children.push(map[m.id]);
      else roots.push(map[m.id]);
    } else {
      roots.push(map[m.id]);
    }
  });
  return roots;
}

export default function MessageList({ messages, currentUserId, typingUsers = [], onReply, onToggleUpvote }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typingUsers]); // Added typingUsers to dependency array to scroll when typing indicator appears

  const tree = useMemo(() => buildTree(messages || []), [messages]);

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-blue-50 rounded-lg">
      {tree.map((node) => (
        <MessageItem key={node.id} node={node} currentUserId={currentUserId} onReply={onReply} onToggleUpvote={onToggleUpvote} />
      ))}

      {typingUsers.length > 0 && (
        <div className="inline-flex items-center text-xs text-blue-700 px-2 py-1 bg-blue-50 rounded-md self-start">
          <span className="mr-2">•••</span>
          {typingUsers.length === 1 ? "Someone is typing..." : "Several people are typing..."}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  typingUsers: PropTypes.array,
  onReply: PropTypes.func.isRequired,
  onToggleUpvote: PropTypes.func.isRequired,
};
