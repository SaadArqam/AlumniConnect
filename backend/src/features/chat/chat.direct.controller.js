const prisma = require("../../lib/prisma");
const chatService = require("./chat.service");

// Create or find a 1:1 thread between two users
exports.getOrCreateDirectThread = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const { otherUserId } = req.body;

    if (currentUserId === otherUserId) {
      return res.status(400).json({ message: "Cannot create direct thread with yourself" });
    }

    // Reuse Thread but tag via title convention or existing one with both participants in messages
    // For simplicity, we'll create a dedicated thread per pair if none exists yet, using deterministic title
    const title = `Direct:${[currentUserId, otherUserId].sort().join(":")}`;

    let thread = await prisma.thread.findFirst({
      where: { title },
    });

    if (!thread) {
      thread = await chatService.createThread({ title, createdById: currentUserId });
    }

    return res.status(200).json(thread);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating or fetching direct thread" });
  }
};


