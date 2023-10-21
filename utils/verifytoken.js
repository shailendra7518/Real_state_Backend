const jwt = require("jsonwebtoken");
require("dotenv").config(); // Assuming you have a config file with a secret key

const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({status:401, message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.json({status:401, message: "Invalid token" });
    }

      req.user = decoded;
      console.log("everything correct")
    next();
  });
};

module.exports = verifyToken;
