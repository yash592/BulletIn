const axios = require('axios');
const db = require('../models');

module.exports = {
  getSavedUsers: function(req, res) {
    // console.log('got to getsaveduser');
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
    console.log(db.users.find({name: user.name}).count());
    db.users.count({ name: user.name})
      .then(count => {
        console.log(count);
        if(count >= 1) {
          console.log('user exists');
        } else if (count === 0) {
          db.users.create(user)
            .then(dbArticle => res.json(dbArticle))
        }
      })
  },
  update: function(req, res) {
    console.log('got to user update', req.body, req.params.id);
    db.users.update(
      { name: req.params.id},
      {$push :{
        savedNews: [
        req.body
        ]
      }
    }
  )
  .then(userUpdate => console.log(userUpdate))
  },
  getUserSavedNews: function(req, res) {
    db.users.find({name: req.params.saved})
      .then(savedNews => res.json(savedNews))
  }
}
