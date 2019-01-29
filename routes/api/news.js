const router = require("express").Router();
const newsSearchController = require("../../controllers/newsSearchController");

// Matches with "/api/nyt"
router
  .route("/")
  .get(newsSearchController.searchNews)

module.exports = router;
