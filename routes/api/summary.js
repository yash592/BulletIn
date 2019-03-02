// api route for summary

const router = require('express').Router();
const newsSummaryController = require('../../controllers/newsSummaryController');

// Matches with "/api/summary"
// console.log('got to summary route api');
router
  .route("/")
  .get(newsSummaryController.summarize);

module.exports = router;
