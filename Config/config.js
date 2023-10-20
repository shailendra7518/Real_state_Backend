require("dotenv").config();
module.exports = {
  url: process.env.DB_URL,
  port: process.env.PORT || 3000,
  apiKey: process.env.YOUR_API_KEY,
  // Other configuration variables...
};
