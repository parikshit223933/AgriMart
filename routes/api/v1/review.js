const express = require("express");
const router = express.Router();
const passport = require("passport");
const reviewApi = require("../../../controllers/api/v1/reviewApi");

router.post(
	"/create-new-review",
	passport.authenticate("jwt", { session: false }),
	reviewApi.createReview
);
router.post(
	"/delete-review",
	passport.authenticate("jwt", { session: false }),
	reviewApi.deleteReview
);

module.exports = router;
