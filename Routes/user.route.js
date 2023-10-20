const express = require("express");
const userController = require("../Controllers/user.controller");

const router = express.Router();

// Route for getting user by ID
router.get("/:id", userController.getUserById);

// Add more routes for user actions as needed

module.exports = router;
