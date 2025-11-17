const prisma = require("../../lib/prisma");

exports.createThread = async (userId, title) => {
  return await prisma.thread.create({
    data: { authorId: userId, title },
  });
};

exports.getThreads = async () => {
  return await prisma.thread.findMany({
    orderBy: { createdAt: "desc" },
  });
};

exports.getThreadMessages = async (threadId) => {
  return await prisma.message.findMany({
    where: { threadId },
    orderBy: { createdAt: "asc" },
  });
};
