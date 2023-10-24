const express = require("express");
const listingController = require("../Controllers/listing.controller");
const verifyToken = require("../utils/verifytoken");

const router = express.Router();


// to get all listing on search
router.get("/get", listingController.getListings);

// Route for creating a new list
router.get("/get/:id",listingController.getListingById);


// Route for creating a new list
router.post("/create",verifyToken,listingController.createListing);

// Route for deleting a list
router.delete("/delete/:id",verifyToken,listingController.deleteListing);

// route for editing a list
router.patch("/update/:id",verifyToken, listingController.updateListing);
// Add more routes for user actions as needed

module.exports = router;
