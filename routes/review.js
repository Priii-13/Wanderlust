 const express = require("express");
 const router = express.Router({mergeParams:true});
 const wrapAsync = require("../utils/wrapAsync.js");
  const {validateReview,IsLoggedin, isReviewAuthor} = require("../middlewares.js");
  const reviewController = require("../controllers/reviews");
  


//create review
 router.post("/",
    IsLoggedin,
    validateReview,
    wrapAsync(reviewController.createReview));


 //delete Review Route
 router.delete("/:reviewId",
   IsLoggedin,
   isReviewAuthor,
    wrapAsync(reviewController.deleteReview)

 );
 module.exports= router;