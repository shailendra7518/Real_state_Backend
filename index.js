// import dotenv to acess environment variable
const express = require("express");
const connectDB = require('./Config/database')
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/user.route");
const authRoutes = require("./Routes/auth.route");
const listingRoutes=require("./Routes/listing.route")
const errorMiddleware = require("./Middleware/error.middleware")
const cors = require("cors");
require("dotenv").config();
 




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
app.use(errorMiddleware);



// Connect to the database
// write listen method to connect from database backend
const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  try {
    connectDB();
      console.log(`server is running on  port ${PORT}`);
  } catch (error) {
    console.log(error)
  }
    // call the connectDB to connect with the database
  

});
