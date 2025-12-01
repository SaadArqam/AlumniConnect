"use client";
import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Send } from "lucide-react";

export default function MessageInput({ threadId, socket, parentId = null, onSent, placeholder = "Write a message..." }) {
  const [value, setValue] = useState("");

  const send = useCallback(
    (e) => {
      e?.preventDefault();
      const content = value.trim();
      if (!content) return;

      if (socket) {
        socket.emit("send_message", { threadId, content, parentId });
      } else {
        // fallback to REST
        fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") + `/api/chat/${threadId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}` },
          body: JSON.stringify({ content, parentId }),
        }).then((r) => r.json()).then((m) => onSent && onSent(m)).catch(console.error);
      }

      setValue("");
      if (onSent) onSent({ threadId, content, parentId });
    },
    [value, socket, threadId, parentId, onSent]
  );

  const onType = () => {
    if (!socket) return;
    socket.emit("typing", { threadId });
  };

  return (
    <form onSubmit={send} className="flex items-center gap-3">
      {parentId && (
        <div className="absolute -top-8 left-4 text-xs text-slate-500">
          Replying...
        </div>
      )}
      <textarea
        className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900 placeholder-slate-400 transition-all"
        rows={1}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onType();
        }}
        onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) send(e); }}
        placeholder={placeholder}
      />
      <button
        type="submit"
        className="bg-slate-900 text-white p-3 rounded-full flex items-center justify-center hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-md"
        aria-label="Send message"
      >
        <Send size={18} />
      </button>
    </form>
  );
}

MessageInput.propTypes = {
  threadId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  socket: PropTypes.object,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSent: PropTypes.func,
  placeholder: PropTypes.string,
};