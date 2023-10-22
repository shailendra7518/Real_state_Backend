const express = require("express");
const userController = require("../Controllers/user.controller");
const verifyToken = require("../utils/verifytoken");

const router = express.Router();


// Route for getting user by ID
router.get("/:id", userController.getUserById);
router.patch("/update/:id",verifyToken, userController.updateUser);

router.delete("/delete/:id", verifyToken, userController.deleteUser);
// Add more routes for user actions as needed

module.exports = router;
