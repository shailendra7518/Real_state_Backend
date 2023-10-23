const express = require("express");
const listingController = require("../Controllers/listing.controller");
const verifyToken = require("../utils/verifytoken");

const router = express.Router();

// Route for creating a new list
router.post("/create",verifyToken,listingController.createListing);

// Route for deleting a list
router.delete("/delete/:id",verifyToken,listingController.deleteListing);

// route for editing a list
router.patch("/update/:id", listingController.updateListing);
// Add more routes for user actions as needed

module.exports = router;
