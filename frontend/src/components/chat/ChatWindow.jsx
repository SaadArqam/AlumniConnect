"use client";
import React, { useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import NewThreadModal from "./NewThreadModal";

export default function ChatWindow() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const { socket, connected } = useSocket(token);
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isNewThreadModalOpen, setIsNewThreadModalOpen] = useState(false);

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000").replace(/\/$/, "");

  useEffect(() => {
    if (!token) return;

    // fetch threads
    fetch(`${API_BASE}/api/chat`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setThreads)
      .catch(console.error);
  }, [token, API_BASE]);

  useEffect(() => {
    if (!socket) return;

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
      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u !== userId));
      }, 1500);
    };

    socket.on("new_message", onNewMessage);
    socket.on("user_typing", onUserTyping);
    socket.on("update_message", onUpdateMessage);

    return () => {
      socket.off("new_message", onNewMessage);
      socket.off("user_typing", onUserTyping);
      socket.off("update_message", onUpdateMessage);
    };
  }, [socket, currentThread]);

  useEffect(() => {
    if (!socket || !currentThread || !connected) return;
    socket.emit("join_thread", currentThread);
  }, [socket, currentThread, connected]);

  async function openThread(threadId) {
    setCurrentThread(threadId);
    if (!token) return;
    const res = await fetch(`${API_BASE}/api/chat/${threadId}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const msgs = await res.json();
    setMessages(msgs);

    // join socket room
    if (socket && connected) socket.emit("join_thread", threadId);
  }

  const [replyTo, setReplyTo] = useState(null);

  function handleReply(parentId) {
    setReplyTo(parentId);
  }

  function handleSent(opt) {
    setReplyTo(null);
  }

  function handleToggleUpvote(messageId) {
    if (!socket) {
      // fallback: call REST
      fetch(`${API_BASE}/api/chat/messages/${messageId}/upvote`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()).then((m) => setMessages((prev) => prev.map((p) => (p.id === m.id ? m : p)))).catch(console.error);
      return;
    }

    socket.emit("toggle_upvote", { messageId });
  }

  async function createThread(title) {
    if (!token) return;
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title }),
    });
    const t = await res.json();
    setThreads((prev) => [t, ...prev]);
    openThread(t.id);
  }

  async function handleDeleteMessage(messageId) {
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/api/chat/messages/${messageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        // Remove message from local state
        setMessages((prev) => prev.filter((m) => m.id !== messageId));
      } else {
        console.error("Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
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
    <div className="h-full flex rounded-2xl shadow-lg overflow-hidden bg-white/80 backdrop-blur-lg border border-slate-200">
      {/* Sidebar for Threads */}
      <aside className="w-80 bg-white/60 backdrop-blur-md border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-900">Threads</h2>
            <button
              onClick={() => setIsNewThreadModalOpen(true)}
              className="px-4 py-2 bg-slate-900 text-white text-xs rounded-full hover:bg-slate-800 transition-all shadow-sm"
            >
              New Thread
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {threads.map((t) => (
            <div
              key={t.id}
              onClick={() => openThread(t.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${currentThread === t.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-50/80 hover:bg-slate-100 text-slate-900'
                }`}
            >
              <div className="font-medium text-sm">{t.title}</div>
              <div className={`text-xs mt-1 ${currentThread === t.id ? 'text-slate-300' : 'text-slate-500'}`}>
                by {t.createdBy?.name || t.createdById}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-slate-50/50">
        {currentThread ? (
          <>
            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4">
              <MessageList messages={messages} currentUserId={currentUserId} typingUsers={typingUsers} onReply={handleReply} onToggleUpvote={handleToggleUpvote} onDelete={handleDeleteMessage} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-200 bg-white/80 backdrop-blur-md">
              <MessageInput threadId={currentThread} socket={socket} parentId={replyTo} onSent={handleSent} placeholder={replyTo ? 'Replying...' : 'Type a message...'} />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-base">
            Select a thread to start chatting
          </div>
        )}
      </main>

      {/* New Thread Modal */}
      <NewThreadModal
        isOpen={isNewThreadModalOpen}
        onClose={() => setIsNewThreadModalOpen(false)}
        onCreateThread={createThread}
      />
    </div>
  );
}