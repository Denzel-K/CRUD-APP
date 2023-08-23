const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  gender: String,
  status: String
})

const User = mongoose.model ('crud_users', userSchema);

module.exports = User;