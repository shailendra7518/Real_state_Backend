const { json } = require("express");
const UserModel = require("../Models/user.model");

const userController = {

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
