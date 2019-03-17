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
  saveUser: function(user) {
    console.log(user);
    return axios.post("/api/user", user).then(console.log('done'))
  },
  saveUserNews: function(story, userID) {
    console.log('got to saveUserNews', story, userID);
    return axios.put("/api/user/" + userID, story).then(console.log('done'))
  },
  deleteUserNews: function(story, user) {
    console.log('got to delete user news' ,story, user);
    return axios.put("/api/user/"+user, story)
      .then(console.log('done'))
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
