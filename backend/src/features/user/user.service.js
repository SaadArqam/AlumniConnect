const prisma = require("../../lib/prisma");

exports.getMe = (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      socialLinks: true,
      posts: true,
      comments: true
    }
  });
};

exports.setRole = (userId, role) => {
  return prisma.user.update({
    where: { id: userId },
    data: { role }
  });
};

exports.updateProfile = (userId, data) => {
  // Save profile fields under `profile` JSON object to keep role-specific data scoped
  return prisma.user.update({
    where: { id: userId },
    data: { profile: data }
  });
};

exports.getUserById = (id) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      socialLinks: true,
      posts: true,
      comments: true
    }
  });
};

exports.searchUsers = (query) => {
  return prisma.user.findMany({
    where: {
      name: { contains: query, mode: "insensitive" }
    },
    select: {
      id: true,
      name: true,
      email: true,
      profilePic: true,
      role: true
    }
  });
};

exports.getAllByRole = (role) => {
  return prisma.user.findMany({
    where: { role },
    orderBy: { name: "asc" }
  });
};
