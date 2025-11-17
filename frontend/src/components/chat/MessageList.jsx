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
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const tree = useMemo(() => buildTree(messages || []), [messages]);

  return (
    <div className="flex-1 overflow-auto p-4 space-y-3 bg-gray-50">
      {tree.map((node) => (
        <MessageItem key={node.id} node={node} currentUserId={currentUserId} onReply={onReply} onToggleUpvote={onToggleUpvote} />
      ))}

      {typingUsers.length > 0 && (
        <div className="text-sm text-gray-500 px-2">{typingUsers.join(", ")} is typing...</div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
