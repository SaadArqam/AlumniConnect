const prisma = require("../../lib/prisma");

async function createThread({ title, createdById }) {
  const thread = await prisma.thread.create({
    data: {
      title,
      createdById,
    },
  });
  return thread;
}

async function getThreads() {
  return prisma.thread.findMany({
    orderBy: { createdAt: "desc" },
    include: { createdBy: true, messages: { take: 1, orderBy: { createdAt: "desc" } } },
  });
}

async function getMessages(threadId) {
  return prisma.message.findMany({
    where: { threadId },
    orderBy: { createdAt: "asc" },
    include: { author: true },
  });
}

async function createMessage({ threadId, authorId, content, parentId = null }) {
  const msg = await prisma.message.create({
    data: {
      threadId,
      authorId,
      content,
      parentId: parentId || null,
    },
  });

  return msg;
}

async function deleteMessage({ messageId, requestingUserId }) {
  const message = await prisma.message.findUnique({ where: { id: messageId } });
  if (!message) throw new Error("Message not found");
  if (message.authorId !== requestingUserId) throw new Error("Not authorized");

  await prisma.message.delete({ where: { id: messageId } });
  return true;
}

module.exports = {
  createThread,
  getThreads,
  getMessages,
  createMessage,
  deleteMessage,
};
