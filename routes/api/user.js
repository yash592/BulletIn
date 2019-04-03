const router = require("express").Router();
const userSaveController = require('../../controllers/userSaveController');

// Matches with "/api/user"

router
  .route("/")
  .get(userSaveController.getSavedUsers)
  .post(userSaveController.create)

router
  .route("/:saved")
  .get(userSaveController.getUserSavedNews)


router
  .route("/:id")
  .put(userSaveController.update)
  


module.exports = router;
