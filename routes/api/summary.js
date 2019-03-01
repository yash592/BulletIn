// api route for summary

const router = require('express').Router();
const newsSummaryController = require('../../controllers/newsSummaryController');

router
  .route("/")
  .get(newsSummaryController.summarize);

module.exports = router;
