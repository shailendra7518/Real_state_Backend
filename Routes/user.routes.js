const express = require("express");
const userController = require("../Controllers/user.controller");

const router = express.Router();

// Route for creating a new user
router.post("/register", userController.createUser);
// Route for logging in
router.post('/login', userController.loginUser);

// Route for getting user by ID
router.get("/:id", userController.getUserById);

// Add more routes for user actions as needed

module.exports = router;
