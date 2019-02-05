const router = require("express").Router();
const userSaveController = require('../../controllers/userSaveController');

router
  .route("/")
  .post(userSaveController.create);

module.exports = router;
