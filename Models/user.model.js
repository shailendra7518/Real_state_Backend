const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required:true,unique:true },
    email: {type: String ,required:true },
    password: {type: String,required:true},
  // Add more fields as needed
},{timestamps:true});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
