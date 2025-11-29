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

exports.saveProfile = async (userId, payload) => {
  if (!payload || typeof payload !== "object") {
    const error = new Error("Invalid payload");
    error.statusCode = 400;
    throw error;
  }

  const {
    role,
    name,
    bio,
    skills,
    socialLinks,
    profile = {},
  } = payload;

  const data = {};

  if (role) {
    if (!["STUDENT", "ALUMNI"].includes(role)) {
      const error = new Error("Invalid role supplied");
      error.statusCode = 400;
      throw error;
    }
    data.role = role;
  }

  if (typeof name === "string" && name.trim()) data.name = name.trim();
  if (typeof bio === "string") data.bio = bio;

  if (Array.isArray(skills)) {
    data.skills = skills.map((s) => String(s).trim()).filter(Boolean);
  }

  if (socialLinks && typeof socialLinks === "object") {
    data.socialLinks = {
      linkedin: socialLinks.linkedin || null,
      github: socialLinks.github || null,
      portfolio: socialLinks.portfolio || null,
      twitter: socialLinks.twitter || null,
    };
  }

  const profileData = { ...(profile || {}) };
  // Normalize booleans/numbers if present
  if (profileData.graduationYear)
    profileData.graduationYear = Number(profileData.graduationYear) || null;
  if (profileData.currentYear)
    profileData.currentYear = Number(profileData.currentYear) || null;
  if (profileData.cgpa)
    profileData.cgpa = Number(profileData.cgpa) || null;
  if (profileData.experienceYears)
    profileData.experienceYears = Number(profileData.experienceYears) || null;
  if (profileData.mentoringAvailable != null)
    profileData.mentoringAvailable = Boolean(profileData.mentoringAvailable);

  data.profile = profileData;

  return prisma.user.update({
    where: { id: userId },
    data,
    include: {
      socialLinks: true,
    },
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
