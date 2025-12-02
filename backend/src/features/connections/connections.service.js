const prisma = require("../../lib/prisma");

exports.sendConnectionRequest = async ({ fromUserId, toUserId }) => {
  if (fromUserId === toUserId) {
    throw new Error("Cannot connect to yourself");
  }

  // Check if already connected
  const [fromUser, toUser] = await Promise.all([
    prisma.user.findUnique({ where: { id: fromUserId } }),
    prisma.user.findUnique({ where: { id: toUserId } }),
  ]);

  if (!fromUser || !toUser) {
    throw new Error("User not found");
  }

  if (fromUser.connections?.includes(toUserId) || toUser.connections?.includes(fromUserId)) {
    return { alreadyConnected: true };
  }

  // Check existing pending request
  const existing = await prisma.connectionRequest.findFirst({
    where: {
      OR: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
      status: "PENDING",
    },
  });

  if (existing) {
    return { alreadyPending: true, request: existing };
  }

  const request = await prisma.connectionRequest.create({
    data: {
      fromUserId,
      toUserId,
    },
  });

  return { request };
};

exports.respondToRequest = async ({ requestId, currentUserId, action }) => {
  const request = await prisma.connectionRequest.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    throw new Error("Request not found");
  }

  if (request.toUserId !== currentUserId) {
    throw new Error("Not authorized to respond to this request");
  }

  if (request.status !== "PENDING") {
    return request;
  }

  let status = "PENDING";
  if (action === "accept") status = "ACCEPTED";
  if (action === "decline") status = "DECLINED";

  const updated = await prisma.connectionRequest.update({
    where: { id: requestId },
    data: {
      status,
      updatedAt: new Date(),
    },
  });

  if (status === "ACCEPTED") {
    // Push connections on both users
    await Promise.all([
      prisma.user.update({
        where: { id: request.fromUserId },
        data: {
          connections: {
            push: request.toUserId,
          },
        },
      }),
      prisma.user.update({
        where: { id: request.toUserId },
        data: {
          connections: {
            push: request.fromUserId,
          },
        },
      }),
    ]);
  }

  return updated;
};

exports.getPendingRequestsForUser = async (userId) => {
  return prisma.connectionRequest.findMany({
    where: {
      toUserId: userId,
      status: "PENDING",
    },
    include: {
      fromUser: {
        select: {
          id: true,
          name: true,
          profilePic: true,
          role: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

exports.getSentRequestsForUser = async (userId) => {
  return prisma.connectionRequest.findMany({
    where: {
      fromUserId: userId,
      status: "PENDING",
    },
    include: {
      toUser: {
        select: {
          id: true,
          name: true,
          profilePic: true,
          role: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};


