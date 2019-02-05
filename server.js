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

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bulletIn', {useNewUrlParser: true});


// db.users.create({
//     name: "String",
//     email: "String",
//     authID: "String",
//     picture: "String",
//     savedNews: []
// }).then(function(user) {
//   console.log(user);
// }).catch(function(err) {
//   console.log(err);
// })

// db.saveNews.findAll({}).then(res => console.log(res))


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

// mongoose.Promise = global.promise;

// Send every request to the React app
// Define any API routes before this runs


app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
