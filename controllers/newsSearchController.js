const axios = require('axios');
// const db = require('../models');

module.exports = {
  // topNews by country
  topNews: function(req, res) {
    let url = 'https://newsapi.org/v2/top-headlines?country=us&pageSize=36&apiKey=513740817e1e424cb4406d9e434de94f'
    axios.get(url)
      .then(response => {
        console.log("response" , response);
        res.json(response.data.articles)
      })
  },

  // topNews by category - politics
  topNewsPolitics: function(req, res) {
    let url = 'https://newsapi.org/v2/top-headlines?country=us&category=politics&apiKey=513740817e1e424cb4406d9e434de94f'
    axios.get(url)
      .then(response => {
        console.log("response" , response);
        res.json(response.data.articles)
      })
  },

  // topNews by category - business
  topNewsBusiness: function(req, res) {
    let url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=513740817e1e424cb4406d9e434de94f'
    axios.get(url)
      .then(response => {
        console.log("response" , response);
        res.json(response.data.articles)
      })
  },

  // topNews by category - sports
  topNewsSports: function(req, res) {
    let url = 'https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=513740817e1e424cb4406d9e434de94f'
    axios.get(url)
      .then(response => {
        console.log("response" , response);
        res.json(response.data.articles)
      })
  },

  // topNews by category - entertainment
  topNewsEntertainment: function(req, res) {
    let url = 'https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=513740817e1e424cb4406d9e434de94f'
    axios.get(url)
      .then(response => {
        console.log("response" , response);
        res.json(response.data.articles)
      })
  },

  // topNews by category - technology
  topNewsTech: function(req, res) {
    let url = 'https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=513740817e1e424cb4406d9e434de94f'
    axios.get(url)
      .then(response => {
        console.log("response" , response);
        res.json(response.data.articles)
      })
  },

  // topNews by category - health
  topNewsHealth: function(req, res) {
    let url = 'https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=513740817e1e424cb4406d9e434de94f'
    axios.get(url)
      .then(response => {
        console.log("response" , response);
        res.json(response.data.articles)
      })
  },

}
