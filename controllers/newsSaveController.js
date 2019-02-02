const axios = require('axios');
const db = require('../models');


module.exports = {
  // get saved news from mongodb
  getSavedNews: function(req, res) {
    console.log('got');
    db.saveNews.find({})
      .then(savedNews => res.json(savedNews))
      .catch(err => res.status(422).json(err))
  },
  create: function(req, res) {
    console.log('req', req.body.title);
    const story = {
      title: req.body.title,
      image: req.body.title,
      description: req.body.title,
      source: req.body.title,
      publishedAt: req.body.title,
      url: req.body.title,
      author:req.body.title
    };
    db.saveNews.create(story).then(dbArticle => res.json(dbArticle))
  }
}
