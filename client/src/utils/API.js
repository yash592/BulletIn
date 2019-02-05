import axios from "axios";


export default {
  // Gets articles from the NYT API
  getArticles: function() {
    return axios.get("/api/news");
  },
  getSavedArticles: function() {
    return axios.get("/api/saved")
  },
  saveNews: function(story) {
    console.log('got to save news', story);
    return axios.post("/api/saved", story).then(console.log('done'))
  },
  saveUser: function(user) {
    console.log(user);
    return axios.post("/api/user", user).then(console.log('done'))
  }
};
