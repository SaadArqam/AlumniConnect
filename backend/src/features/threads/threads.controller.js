const service = require("./threads.service");

exports.createThread = async (req, res) => {
  try {
    const thread = await service.createThread(req.user.userId, req.body.title);
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getThreads = async (req, res) => {
  try {
    const threads = await service.getThreads();
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getThreadMessages = async (req, res) => {
  try {
    const messages = await service.getThreadMessages(req.params.threadId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
