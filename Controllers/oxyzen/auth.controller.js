
const UserModel = require("../../Models/oxyzen/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createCustomError, errorHandler } = require("../../utils/errorHandler");

const authController = {
  signupUser: async (req, res, next) => {
    console.log("------", req.body);
    try {
      const { name, email, password } = req.body;

      // Validate username, email, and password
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
      }

      // Check if email format is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email address",
        });
      }

      // Check if username or email already exists
      const existingUser = await UserModel.findOne({
        $or: [{ name }, { email }],
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username or email is already taken",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await UserModel.create({
        ...req.body,
        password: hashedPassword,
        
      });
       delete newUser.password



      res.status(200).json({
        success: true,
        message: "Signup successful",
        user: newUser,
      });
    } catch (error) {
      next(error);
    }
  },

  signUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Validate username and password
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      // Check if user with provided username exists
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Generate a token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "100h",
      });

      res.cookie("access-token", token, {
        maxAge: 1000 * 60 * 10,
        httpOnly: true,
        secure: false,
        path: "/",
        domain: "localhost",
      });

      res.status(201).json({
        success: true,
        message: "Login successful",
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  // Add more user-related controller functions as needed
};

module.exports = authController;
