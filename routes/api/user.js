const router = require("express").Router();
const userSaveController = require('../../controllers/userSaveController');

// Matches with "/api/user"

router
  .route("/")
  .get(userSaveController.getSavedUsers)
  .post(userSaveController.create)


module.exports = router;
