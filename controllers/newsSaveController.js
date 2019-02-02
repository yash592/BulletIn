const axios = require('axios');
const db = require('../models');


module.exports = {
  // get saved news from mongodb
  getSavedNews: function(req, res) {
    console.log('got');
    db.saveNews.find({})
      .then(savedNews => res.json(savedNews))
      .catch(err => res.status(422).json(err))
  }
}
