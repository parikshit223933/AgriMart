const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/review_controller");
const passport = require('passport');
const passportLocal = require('../config/passport_local_strategy');

// Create Review
router.post('/add',passport.checkAuthentication,  reviewController.createReview)

// Reviews Update page
router.get('/:review_id/edit',passport.checkAuthentication,  reviewController.editReview)

//update Review
router.put("/:review_id/update",passport.checkAuthentication,  reviewController.updateReview)

//delete review
router.delete("/:review_id/delete",passport.checkAuthentication,  reviewController.deleteReview)

/* remove the passport.checkAuthentication where ever it is not needed. (if you dont want an authentication check for that action to be performed.) */

module.exports = router;