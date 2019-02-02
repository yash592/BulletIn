const router = require("express").Router();
const newsSaveController = require('../../controllers/newsSaveController');

// Matches with api/savedNews

router
  .route("/")
  .get(newsSaveController.getSavedNews);

module.exports = router;
