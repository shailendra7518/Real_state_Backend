const { json } = require("express");
const UserModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
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
 
  console.log(req.body,req.params)
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
       const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET_KEY, {
         expiresIn: "1h",
       }); 

      res
        .json({status:200, message: "User updated successfully", user: updatedUser,token:token });
    } catch (error) {
      next(error);
    }
  },

  // Add more user-related controller functions as needed
};

module.exports = userController;
