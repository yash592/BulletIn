import axios from "axios";


export default {
  // Gets articles from the NYT API
  getArticles: function() {
    return axios.get("/api/news");
  },
  getSavedArticles: function() {
    return axios.get("/api/saved")
  }
};
