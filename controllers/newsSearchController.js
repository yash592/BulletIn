const axios = require('axios');
// const db = require('../models');

module.exports = {
  searchNews: function(req, res) {
    let url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=513740817e1e424cb4406d9e434de94f'
    axios.get(url)
      .then(response => {
        console.log("response" , response);
        res.json(response.data.articles)
      })
  }
}
