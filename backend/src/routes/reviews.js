import express from 'express';

const router = express.Router();

import reviewCtrl from "../controllers/reviewsctrl.js";

router.route("/")
   .get(reviewCtrl.getReviews)
   .post(reviewCtrl.postReviews)

router.route("/:id")
   .put(reviewCtrl.putReview)
   .delete(reviewCtrl.deleteReview)

export default router;