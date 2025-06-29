
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {IsLoggedin,isOwner,validateListing} = require("../middlewares.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


 
router
.route("/")
//Index Route
.get(wrapAsync(listingController.index)) 
.post(
    IsLoggedin,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
   
)



      //new route
    router.get("/new",
        IsLoggedin,
        wrapAsync(listingController.newForm));


router
.route("/:id")
.get(wrapAsync(listingController.show))
.put(IsLoggedin,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.update))
.delete(IsLoggedin,
        isOwner,
        wrapAsync(listingController.delete));


   

    //Edit route
    router.get("/:id/edit",
        IsLoggedin,
        isOwner,
        wrapAsync(listingController.edit));

    module.exports = router;