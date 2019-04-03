const router = require("express").Router();
const userSaveController = require('../../controllers/userSaveController');


router
  .route("/:id")
  .put(userSaveController.delete)

  module.exports = router;
