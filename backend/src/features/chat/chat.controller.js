const chatService = require("./chat.service");

async function createThread(req, res) {
  try {
    const { title } = req.body;
    const createdById = req.user.userId;
    const thread = await chatService.createThread({ title, createdById });
    res.status(201).json(thread);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function getThreads(req, res) {
  try {
    const threads = await chatService.getThreads();
    res.json(threads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function getMessages(req, res) {
  try {
    const { threadId } = req.params;
    const messages = await chatService.getMessages(threadId);
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function createMessage(req, res) {
  try {
    const { threadId } = req.params;
    const { content, parentId } = req.body;
    const authorId = req.user.userId;
    const msg = await chatService.createMessage({ threadId, authorId, content, parentId });
    res.status(201).json(msg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function toggleUpvote(req, res) {
  try {
    const { messageId } = req.params;
    const userId = req.user.userId;
    const updated = await chatService.toggleUpvote({ messageId, userId });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function deleteMessage(req, res) {
  try {
    const { messageId } = req.params;
    const requestingUserId = req.user.userId;
    await chatService.deleteMessage({ messageId, requestingUserId });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    if (err.message === "Not authorized") return res.status(403).json({ error: err.message });
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createThread,
  getThreads,
  getMessages,
  createMessage,
  toggleUpvote,
  deleteMessage,
};
