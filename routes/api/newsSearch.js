const router = require("express").Router();
const newsSearchController = require("../../controllers/newsSearchController");

// Matches with "/api/newsSearch"
router
  .route("/")
  .get(newsSearchController.findAllBySearchTerm)

module.exports = router;
