
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const config = require('./config'); // Assuming you have a config/database.js file with your database configuration
    await mongoose.connect(config.url);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
};

module.exports = connectDB;