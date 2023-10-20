// import dotenv to acess environment variable
const express = require("express");
const connectDB=require('./Config/database')
const config = require("./Config/config");
require("dotenv").config();


// take app from express package
const app = express();

// Connect to the database
// write listen method to connect from database backend
const PORT = config.port;
app.listen(PORT, () => {
    // call the connectDB to connect with the database
    connectDB();
  console.log(`server is running on  port ${PORT}`);
});
