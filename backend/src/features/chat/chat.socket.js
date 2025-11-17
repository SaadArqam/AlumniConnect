const jwt = require("jsonwebtoken");
const prisma = require("../../lib/prisma");

module.exports = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication error"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.userId);

    socket.on("join_thread", (threadId) => {
      socket.join(threadId);
      console.log(`User ${socket.user.userId} joined thread ${threadId}`);
    });

    socket.on("send_message", async ({ threadId, content, parentId }) => {
      const newMsg = await prisma.message.create({
        data: {
          threadId,
          authorId: socket.user.userId,
          content,
          parentId: parentId || null,
        },
      });

      io.to(threadId).emit("new_message", newMsg);
    });

    socket.on("typing", ({ threadId }) => {
      io.to(threadId).emit("user_typing", {
        userId: socket.user.userId,
      });
    });
  });
};
