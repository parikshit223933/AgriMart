const express           = require("express"),
    router              = express.Router({mergeParams: true}),
    reviewController    = require("../controllers/review_controller")

// Create Review
router.post('/add', reviewController.createReview)

// Reviews Update page
router.get('/:review_id/edit', reviewController.editReview)

//update Review
router.put("/:review_id/update", reviewController.updateReview)

//delete review
router.delete("/:review_id/delete", reviewController.deleteReview)

module.exports = router;