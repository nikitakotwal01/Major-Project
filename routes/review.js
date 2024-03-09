const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {
   validateReview, 
   isloggedIn, 
   isReviewAuthor} = require("../middleware.js");

   const reviewController = require("../controllers/reviews.js");
   const Review = require("../models/review.js");


// REVIEWS
// POST  REVIEW ROUTE
router.post(
   "/",
   isloggedIn,
   validateReview, 
   wrapAsync( reviewController.createReview)
   );
 
 // REVIEWS
 // DELETE REVIEW ROUTE
 router.delete(
   "/:reviewId",
   isloggedIn,
   isReviewAuthor,
   wrapAsync(reviewController.destroyReview)
   ); 

 module.exports = router;