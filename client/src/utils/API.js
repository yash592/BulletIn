import axios from "axios";
const unirest = require('unirest')


export default {
  // Gets articles from the NYT API
  getArticles: function() {
    console.log('getUSA');
    return axios.get("/api/news");
  },
  getArticlesBySearchTerm: function(searchTerm) {
    console.log('get searchTerm', searchTerm);
    let url = `https://newsapi.org/v2/everything?q=${searchTerm}&pageSize=100&sortBy=publishedAt&apiKey=513740817e1e424cb4406d9e434de94f`
    console.log(url);
    return axios.get(url)
  },
  summarize: function(link) {
    return unirest.post("https://textanalysis-text-summarization.p.rapidapi.com/text-summarizer")
   .header("X-RapidAPI-Key", "ykuhaOwNktmshrawXHrZYZyBNzuXp1WgLSajsnL5opgjvLJXud")
   .header("Content-Type", "application/json")
   .send({"url":link,"text":"","sentnum":5})
  },
  saveUser: function(user) {
    console.log(user);
    return axios.post("/api/user", user)
  },
  saveUserNews: function(story, userID) {
    console.log('got to saveUserNews', story, userID);
    return axios.put("/api/user/" + userID, story)
  },
  deleteUserNews: function(story, user) {
    console.log('got to delete user news', story, user);
    return axios.put("/api/user/"+user, story)
  },
  getSavedUsers: function() {
    console.log('got to saved user');
    return axios.get("/api/user")
  },
  getSavedArticles: function(user) {
    console.log('user from API.js', user);
    return axios.get("/api/user/" + user)
  }
};
