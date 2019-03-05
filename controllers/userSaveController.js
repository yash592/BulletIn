const axios = require('axios');
const db = require('../models');

module.exports = {
  getSavedUsers: function(req, res) {
    console.log('got to getsaveduser');
    db.users.find({})
      .then(savedUsers => res.json(savedUsers))
      .catch(err => res.status(422).json(err))
  },
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
  },
  update: function(req, res) {
    console.log('got to user update');
    db.users.update()
      .then(userUpdate => console.log(userUpdate))
  }
}
