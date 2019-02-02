const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const saveNewsSchema = new Schema({
  title: String,
  image: String,
  description: String,
  source: String,
  publishedAt: String,
  url: String,
  author: String
});

const saveNews = mongoose.model("saveNews", saveNewsSchema);

module.exports = saveNews;
