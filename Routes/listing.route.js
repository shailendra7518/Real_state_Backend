const express = require("express");
const listingController = require("../Controllers/listing.controller");
const verifyToken = require("../utils/verifytoken");

const router = express.Router();

// Route for creating a new list
router.post("/create",verifyToken,listingController.createListing);


// Add more routes for user actions as needed

module.exports = router;