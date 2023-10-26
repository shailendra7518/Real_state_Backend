require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
  // Assuming you have a config/database.js file with your database configuration
    await mongoose.connect(process.env.DB_URL);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
};

module.exports = connectDB;
