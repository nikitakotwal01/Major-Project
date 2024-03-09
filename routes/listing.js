const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isloggedIn, isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});



// for("/")
router
.route("/")
  .get(
    wrapAsync(listingController.index))
    .post(
        isloggedIn,
    // validateListing,
    upload.single('listing[image]'),
   wrapAsync( listingController.createListing)
   );

// New Route
router.get("/new", isloggedIn ,listingController.renderNewForm);


// for "/:id"
 router.route("/:id") 
 .get(
    wrapAsync(listingController.showListing ))
.put(
    isloggedIn,
    isOwner,
    upload.single('listing[image]'),
     // validateListing,
      wrapAsync( listingController.updateListing))
.delete(
     isloggedIn,
     isOwner,
    wrapAsync(listingController.destroyListing));       
       
 

// edit route
router.get(
    "/:id/edit",
    isloggedIn,
    isOwner,
     wrapAsync( listingController.renderEdit));


module.exports = router;