const express = require("express");
const authController = require("../Controllers/auth.controller");

const router = express.Router();

// Route for creating a new user
router.post("/signup", authController.signupUser);
// Route for logging in
router.post("/signin", authController.signUser);


// Add more routes for user actions as needed

module.exports = router;
