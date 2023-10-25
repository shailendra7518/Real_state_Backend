// import dotenv to acess environment variable
const express = require("express");
const connectDB = require('./Config/database')
const cookieParser = require("cookie-parser");
const config = require("./Config/config");
const userRoutes = require("./Routes/user.route");
const authRoutes = require("./Routes/auth.route");
const listingRoutes=require("./Routes/listing.route")
const errorMiddleware = require("./Middleware/error.middleware")
const cors = require("cors");
require("dotenv").config();
 
const path = require('path')

// const __dirname = path.resolve();

// take app from express package
const app = express();
//adding cors
app.use(cookieParser());

app.use(cors());
// add json
app.use(express.json())

// end point for users

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/listing", listingRoutes)

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


app.use(errorMiddleware);



// Connect to the database
// write listen method to connect from database backend
const PORT = config.port;
app.listen(PORT, () => {
    // call the connectDB to connect with the database
    connectDB();
  console.log(`server is running on  port ${PORT}`);
});
