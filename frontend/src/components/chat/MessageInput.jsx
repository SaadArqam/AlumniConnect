"use client";
import React, { useState, useCallback } from "react";

export default function MessageInput({ threadId, socket }) {
  const [value, setValue] = useState("");

  const send = useCallback(
    (e) => {
      e?.preventDefault();
      const content = value.trim();
      if (!content || !socket) return;
      socket.emit("send_message", { threadId, content });
      setValue("");
    },
    [value, socket, threadId]
  );

  const onType = () => {
    if (!socket) return;
    socket.emit("typing", { threadId });
  };

  return (
    <form onSubmit={send} className="p-3 bg-white border-t flex gap-2">
      <textarea
        className="flex-1 p-2 border rounded resize-none"
        rows={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) send(e); }}
        onInput={onType}
        placeholder="Write a message..."
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
    </form>
  );
}
