const { json } = require("express");
const UserModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/errorHandler");
const Listing = require("../Models/listing.model");
const userController = {
  getUserById: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateUser: async (req, res, next) => {
    console.log(req.body, req.params);
    if (req.user.id !== req.params.id) {
      return next("you can update only your account", 401);
    }
    try {
      const _id = req.params.id; // Assuming you're passing the user ID as a parameter

      // Assuming you have a validation mechanism here to validate the request body

      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        _id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        }, // Assuming req.body contains the updated user data
        { new: true } // Return the updated user
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const token = jwt.sign(
        { id: updatedUser._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.json({
        status: 200,
        message: "User updated successfully",
        user: updatedUser,
        token: token,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      next(errorHandler("you can delte only your own accound",400))
    }
    try {
      const user = await UserModel.findByIdAndDelete(req.params.id);
      res.json({status:201,message:"user delete successfully",user:user});
    } catch (error) {
      res.json({ status:500,message: error.message });
    }
  },
  getUserListing: async (req,res,next) => {
    if (req.headers.id === req.params.id) {
      try {
        const listings = await Listing.find({ userRef: req.params.id });
        res.status(200).json({status:200,message:"request successfull",listings})
        
      } catch (error) {
        next(error)
      }
    } else {
      return next(errorHandler("you can viwe your own listings",401))
    }
   
  }

  // Add more user-related controller functions as needed
};

module.exports = userController;
