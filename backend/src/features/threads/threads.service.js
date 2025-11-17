const repo = require("./threads.repository");

exports.createThread = async (userId, title) => {
  return await repo.createThread(userId, title);
};

exports.getThreads = async () => {
  return await repo.getThreads();
};

exports.getThreadMessages = async (threadId) => {
  return await repo.getThreadMessages(threadId);
};
