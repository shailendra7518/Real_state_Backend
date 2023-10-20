const { json } = require("express");
const UserModel = require("../Models/user.model");

const userController = {
  createUser: async (req, res) => {
    try {
      const newUser = new UserModel(req.body);
      await newUser.save();
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
    loginUser: async (req, res) => {
      return res.json("logged in")
    // try {
    //   const { username, password } = req.body;
    //   const user = await UserModel.findOne({ username, password });

    //   if (!user) {
    //     return res
    //       .status(404)
    //       .json({ message: "Invalid username or password" });
    //   }

    //   // Here, you may implement your authentication logic, like generating a token.

    //   res.json({ message: "Login successful", user });
    // } catch (error) {
    //   res.status(500).json({ message: error.message });
    // }
  },

  getUserById: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add more user-related controller functions as needed
};

module.exports = userController;
