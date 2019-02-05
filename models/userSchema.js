const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const saveUserSchema = new Schema({
  name: String,
  email: String,
  authID: String,
  picture: String,
  savedNews: []
})

const users = mongoose.model("users", saveUserSchema)

module.exports = users;
