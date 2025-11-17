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

      const full = await prisma.message.findUnique({ where: { id: newMsg.id }, include: { author: true } });
      io.to(threadId).emit("new_message", full);
    });

    socket.on("typing", ({ threadId }) => {
      io.to(threadId).emit("user_typing", {
        userId: socket.user.userId,
      });
    });

    socket.on("toggle_upvote", async ({ messageId }) => {
      try {
        const message = await prisma.message.findUnique({ where: { id: messageId } });
        if (!message) return;

        const current = message.upvotes || [];
        const has = current.includes(socket.user.userId);
        const next = has ? current.filter((u) => u !== socket.user.userId) : [...current, socket.user.userId];

        const updated = await prisma.message.update({
          where: { id: messageId },
          data: { upvotes: next },
        });

        const full = await prisma.message.findUnique({ where: { id: updated.id }, include: { author: true } });
        // broadcast update to the thread room
        io.to(message.threadId).emit("update_message", full);
      } catch (e) {
        console.error("toggle_upvote error", e);
      }
    });
  });
};
