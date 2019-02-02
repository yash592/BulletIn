const router = require("express").Router();
const newsSearchController = require("../../controllers/newsSearchController");

// Matches with "/api/news"
router
  .route("/")
  .get(newsSearchController.findAll)

module.exports = router;
