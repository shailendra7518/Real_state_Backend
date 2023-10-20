const { json } = require("express");
const UserModel = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
    signupUser: async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate username, email, and password
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Check if email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Check if username or email already exists
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email is already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.json({ message: "Signup successful", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  },
  signUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Validate username and password
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

      // Check if user with provided username exists
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Generate a token
      const token = jwt.sign({ id: user._id }, "secret_key", {
        expiresIn: "1h",
      }); // Change 'secret_key' to your own secret

      res.json({ message: "Login successful", user, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Add more user-related controller functions as needed
};

module.exports = authController;
