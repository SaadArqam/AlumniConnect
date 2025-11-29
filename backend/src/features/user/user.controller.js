const userService = require("./user.service");

exports.getMe = async (req, res) => {
  try {
    const user = await userService.getMe(req.user.userId);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching profile" });
  }
};

exports.saveProfile = async (req, res) => {
  try {
    const user = await userService.saveProfile(req.user.userId, req.body);
    return res.json(user);
  } catch (error) {
    console.error(error);
    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message || "Error saving profile" });
  }
};

exports.setRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["STUDENT", "ALUMNI"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await userService.setRole(req.user.userId, role);
    return res.json(user);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error setting role" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const data = req.body;

    const user = await userService.updateProfile(req.user.userId, data);
    return res.json(user);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating profile" });
  }
};

exports.saveProfile = async (req, res) => {
  try {
    const user = await userService.saveProfile(req.user.userId, req.body);
    return res.json(user);
  } catch (error) {
    console.error(error);
    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message || "Error saving profile" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error getting user" });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const results = await userService.searchUsers(req.params.query);
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ message: "Error searching users" });
  }
};

exports.getAllAlumni = async (req, res) => {
  try {
    const users = await userService.getAllByRole("ALUMNI");
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching alumni" });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const users = await userService.getAllByRole("STUDENT");
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching students" });
  }
};
