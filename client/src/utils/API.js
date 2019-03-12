import axios from "axios";
const unirest = require('unirest')


export default {
  // Gets articles from the NYT API
  getArticles: function() {
    return axios.get("/api/news");
  },
  summarize: function(link) {
    // console.log('summmarize', link);
    return unirest.post("https://textanalysis-text-summarization.p.rapidapi.com/text-summarizer")
   .header("X-RapidAPI-Key", "ykuhaOwNktmshrawXHrZYZyBNzuXp1WgLSajsnL5opgjvLJXud")
   .header("Content-Type", "application/json")
   .send({"url":link,"text":"","sentnum":5})
  },
  getSavedArticles: function() {
    return axios.get("/api/saved")
  },
  saveNews: function(story, userID) {
    console.log('got to save news', story, userID);
    return axios.post("/api/saved", story, userID).then(console.log('done'))
  },
  saveUser: function(user) {
    console.log(user);
    return axios.post("/api/user", user).then(console.log('done'))
  },
  saveUserNews: function(story, userID) {
    console.log('got to saveUserNews', story, userID);
    return axios.put("/api/user/" + userID, story).then(console.log('done'))
  },
  getSavedUsers: function() {
    console.log('got to saved user');
    return axios.get("/api/user")
  }
};
