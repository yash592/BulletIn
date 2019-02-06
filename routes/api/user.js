const router = require("express").Router();
const userSaveController = require('../../controllers/userSaveController');

router
  .route("/")
  .get(userSaveController.getSavedUsers)
  .post(userSaveController.create)


module.exports = router;
