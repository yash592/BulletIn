// controller for news expander
const unirest = require('unirest');
const axios = require('axios');
const db = require('../models');

module.exports = {
  summarize: function(req, res) {
    console.log('got to summarize');
    unirest.get("https://aylien-text.p.rapidapi.com/summarize?url=https%3A%2F%2Findianexpress.com%2Farticle%2Findia%2Fradar-imagery-confirms-4-buildings-in-jaish-madrasa-were-hit-official-5607623%2F")
    .header("X-RapidAPI-Key", "ykuhaOwNktmshrawXHrZYZyBNzuXp1WgLSajsnL5opgjvLJXud")
    .end(function (result) {
    console.log(result.body.sentences)
    res.json(result.body.sentences)
    });
  }
}
