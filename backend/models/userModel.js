//Set Schema with Mongoose

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Make a new User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Declare name of Schema and model
const User = mongoose.model("User", userSchema);

// Export to use in other sections
module.exports = User;
