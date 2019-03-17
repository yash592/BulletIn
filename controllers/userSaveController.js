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
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err))
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
  .then(userUpdate => res.json(userUpdate))
  .catch(err => res.status(422).json(err))
  },
  delete: function(req, res) {
    console.log('got to delete controller', req.params.id, req.body);
    db.users.update(
       { name: req.params.id },
       { $pull: {
         savedNews: { url:  req.body}
       }
      }
    )
    .then(userNewsDelete => res.json(userNewsDelete))
    .catch(err => res.status(422).json(err))
  },
  getUserSavedNews: function(req, res) {
    db.users.find({name: req.params.saved})
      .then(savedNews => res.json(savedNews['0']))
      .catch(err => res.status(422).json(err))
  }
}
