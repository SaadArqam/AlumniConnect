"use client";
import { io } from "socket.io-client";

let socket = null;

export function initSocket(token) {
  const url = process.env.NEXT_PUBLIC_API_URL || "https://alumniconnect-backend-31pn.onrender.com";
  if (socket) return socket;

  socket = io(url, {
    auth: { token },
    autoConnect: false,
    transports: ["websocket"],
    withCredentials: true,
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    try {
      socket.disconnect();
    } catch (e) {
      console.warn("Error disconnecting socket", e);
    }
    socket = null;
  }
}
