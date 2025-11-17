"use client";
import React, { useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";
import { getSocket } from "../../utils/socket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatWindow() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const { socket, connected } = useSocket(token);
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    if (!token) return;

    // fetch threads
    fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") + "/api/chat", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setThreads)
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    const s = getSocket();
    const onNewMessage = (msg) => {
      if (msg.threadId === currentThread) setMessages((m) => [...m, msg]);
    };

    const onUpdateMessage = (msg) => {
      if (msg.threadId !== currentThread) return;
      setMessages((prev) => prev.map((p) => (p.id === msg.id ? msg : p)));
    };

    const onUserTyping = ({ userId }) => {
      if (!userId) return;
      setTypingUsers((prev) => {
        if (prev.includes(userId)) return prev;
        return [...prev, userId];
      });
      // remove after short timeout
      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u !== userId));
      }, 1500);
    };

    s.on("new_message", onNewMessage);
    s.on("user_typing", onUserTyping);
  s.on("update_message", onUpdateMessage);

    return () => {
      s.off("new_message", onNewMessage);
      s.off("user_typing", onUserTyping);
      s.off("update_message", onUpdateMessage);
    };
  }, [socket, currentThread]);

  async function openThread(threadId) {
    setCurrentThread(threadId);
    if (!token) return;
    const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") + `/api/chat/${threadId}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const msgs = await res.json();
    setMessages(msgs);

    // join socket room
    if (socket) socket.emit("join_thread", threadId);
  }

  const [replyTo, setReplyTo] = useState(null);

  function handleReply(parentId) {
    setReplyTo(parentId);
    // focus could be handled by MessageInput if needed
  }

  function handleSent(opt) {
    // opt may be { threadId, content, parentId } when socket used; real message will arrive via socket
    setReplyTo(null);
  }

  function handleToggleUpvote(messageId) {
    if (!socket) {
      // fallback: call REST
      fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") + `/api/chat/messages/${messageId}/upvote`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()).then((m) => setMessages((prev) => prev.map((p) => (p.id === m.id ? m : p)))).catch(console.error);
      return;
    }

    socket.emit("toggle_upvote", { messageId });
  }

  async function createThread(title) {
    if (!token) return;
    const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") + "/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title }),
    });
    const t = await res.json();
    setThreads((prev) => [t, ...prev]);
    openThread(t.id);
  }

  function decodePayloadFromToken(t) {
    try {
      const payload = t.split('.')[1];
      if (!payload) return null;
      const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = b64.padEnd(Math.ceil(b64.length / 4) * 4, '=');
      return JSON.parse(decodeURIComponent(escape(atob(padded))));
    } catch (e) {
      return null;
    }
  }

  const decoded = token ? decodePayloadFromToken(token) : null;
  const currentUserId = decoded?.userId ?? null;

  return (
    <div className="h-screen flex">
      <aside className="w-80 border-r p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Threads</h2>
          <button
            onClick={() => {
              const title = prompt("Thread title:");
              if (title) createThread(title);
            }}
            className="text-sm text-blue-600"
          >
            New
          </button>
        </div>

        <div className="space-y-2">
          {threads.map((t) => (
            <div key={t.id} onClick={() => openThread(t.id)} className={`p-2 rounded cursor-pointer ${currentThread === t.id ? 'bg-gray-100' : ''}`}>
              <div className="font-medium">{t.title}</div>
              <div className="text-xs text-gray-500">{t.createdBy?.name || t.createdById}</div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          {currentThread ? (
            <>
              <div className="flex-1 flex flex-col">
                {/* top input */}
                <div className="p-2 bg-white">
                  <MessageInput threadId={currentThread} socket={socket} parentId={replyTo} onSent={handleSent} placeholder={replyTo ? 'Replying...' : 'Post a comment...'} />
                </div>

                <div className="flex-1">
                  <MessageList messages={messages} currentUserId={currentUserId} typingUsers={typingUsers} onReply={handleReply} onToggleUpvote={handleToggleUpvote} />
                </div>

                {/* bottom input */}
                <div>
                  <MessageInput threadId={currentThread} socket={socket} parentId={replyTo} onSent={handleSent} placeholder={replyTo ? 'Replying...' : 'Post a comment...'} />
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">Select or create a thread to start chatting</div>
          )}
        </div>
      </main>
    </div>
  );
}
