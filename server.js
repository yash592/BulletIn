const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var MongoClient = require('mongodb').MongoClient , assert = require('assert');
const routes = require("./routes");
const db = require('./models')
var mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

// {useNewUrlParser: true}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongo connections

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bulletIn', {useNewUrlParser: true});

// Serve up static assets (usually on heroku)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// serve the app routes

app.use(routes);

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
