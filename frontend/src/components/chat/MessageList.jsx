"use client";
import React, { useEffect, useRef, useMemo } from "react";
import MessageItem from "./MessageItem";

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
    <div className="flex flex-col h-full overflow-y-auto p-4 space-y-4 bg-gray-900 rounded-lg">
      {tree.map((node) => (
        <MessageItem key={node.id} node={node} currentUserId={currentUserId} onReply={onReply} onToggleUpvote={onToggleUpvote} />
      ))}

      {typingUsers.length > 0 && (
        <div className="flex items-center text-sm text-gray-400 px-2 py-1 bg-gray-800 rounded-md self-start animate-pulse">
          <span className="dot-flashing mr-2"></span>
          {typingUsers.length === 1 ? "Someone is typing..." : "Several people are typing..."}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
