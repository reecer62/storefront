const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
})

// Create collection and schema
const User = mongoose.model("Users", UserSchema)

module.exports = User
