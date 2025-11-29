const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
// Use the project's JWT middleware (auth service) which exports the middleware function
const authMiddleware = require("../auth/auth.service");

// Get logged-in user's data
router.get("/me", authMiddleware, userController.getMe);

// Set role after login (Student / Alumni)
router.put("/set-role", authMiddleware, userController.setRole);

// Update full profile based on role
router.put("/update-profile", authMiddleware, userController.updateProfile);
// (No alias) keep canonical route as /users/update-profile

// Get user by ID
router.get("/:id", userController.getUserById);

// Search users
router.get("/search/:query", userController.searchUsers);

// Get all alumni
router.get("/role/alumni/all", userController.getAllAlumni);

// Get all students
router.get("/role/student/all", userController.getAllStudents);

module.exports = router;
