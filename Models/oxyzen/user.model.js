const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
      type: String,
      required:false
  },
  password: {
      type: String,
      required:true
  },
  role: {
      type: String,
      required:false
  },
  avatar: {
      type: String,
      required:false
  },
  reset_token: {
      type: String,
      required:false
  },
  reset_token_expiration: {
      type: String,
      required:false
      
  },
});

const UserModel = mongoose.model("UserOxyzen", userSchema);

module.exports =  UserModel ;
