const axios = require('axios');
const db = require('../models');

// console.log(props);

module.exports = {
  create: function(req, res) {
    console.log('got to user create', req.body);
    const user = {
      name: req.body.nickname,
      email: req.body.name,
      authID: req.body.aud,
      picture: req.body.picture,
      savedNews: []
    }
    db.users.create(user)
      .then(dbArticle => res.json(dbArticle))
  }
}
