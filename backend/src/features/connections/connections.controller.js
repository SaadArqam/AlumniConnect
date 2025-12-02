const connectionsService = require("./connections.service");

exports.sendRequest = async (req, res) => {
  try {
    const fromUserId = req.user.userId;
    const { toUserId } = req.body;
    const result = await connectionsService.sendConnectionRequest({ fromUserId, toUserId });
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message || "Error sending request" });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const { id } = req.params;
    const updated = await connectionsService.respondToRequest({ requestId: id, currentUserId, action: "accept" });
    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message || "Error accepting request" });
  }
};

exports.declineRequest = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const { id } = req.params;
    const updated = await connectionsService.respondToRequest({ requestId: id, currentUserId, action: "decline" });
    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message || "Error declining request" });
  }
};

exports.getIncomingRequests = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const requests = await connectionsService.getPendingRequestsForUser(currentUserId);
    return res.json(requests);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching incoming requests" });
  }
};

exports.getSentRequests = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const requests = await connectionsService.getSentRequestsForUser(currentUserId);
    return res.json(requests);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching sent requests" });
  }
};


