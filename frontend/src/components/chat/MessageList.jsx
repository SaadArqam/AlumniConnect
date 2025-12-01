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
  }, [messages, typingUsers]);

  const tree = useMemo(() => buildTree(messages || []), [messages]);

  return (
    <div className="flex flex-col h-full overflow-y-auto space-y-4">
      {tree.map((node) => (
        <MessageItem key={node.id} node={node} currentUserId={currentUserId} onReply={onReply} onToggleUpvote={onToggleUpvote} />
      ))}

      {typingUsers.length > 0 && (
        <div className="text-xs text-slate-500 px-3 py-2 bg-slate-100 rounded-full inline-flex items-center self-start animate-pulse">
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
