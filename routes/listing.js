const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} =  require("../schema.js");
const Listing = require("../models/listing.js");
const passport = require("passport");
const {IsLoggedin} = require("../middlewares.js");

 const validateListing =(req,res,next)=>{
        let {error}= listingSchema.validate(req.body);
        if(error){
            throw new ExpressError(400,error);
        }
        else{
            next();
        }
    }
//Index Route
router.get("/",wrapAsync(async (req,res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings})

    }))

    
    //new route
    router.get("/new",
        IsLoggedin,
        wrapAsync(async(req,res)=>{
        
    await res.render("listings/form.ejs");
    }))
    // show Route
    router.get("/:id",wrapAsync(async(req,res)=>{
        let {id} =req.params;
        const listing = await Listing.findById(id).populate("reviews"); 
        if(!listing){
        req.flash("error","the listing you are searching for doesn't exist");
        return res.redirect("/listings");
        }
        res.render("listings/show.ejs",{listing})
    }))
    
    // Create Listing Route
    router.post(
      "/",
      IsLoggedin,
      validateListing,
      wrapAsync(async (req, res) => {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        req.flash("success","New Listing Created!");
        res.redirect("/listings");
      })
    );
    
    
    //Edit route
    router.get("/:id/edit",
        IsLoggedin,
        wrapAsync(async(req,res)=>{
        let {id} =req.params;
        const listing = await Listing.findById(id); 
        if(!listing){
        req.flash("error","the listing you are searching for doesn't exist");
        return res.redirect("/listings");
        }
        res.render("listings/edit.ejs",{listing})
    
    }))
    //update route
    router.put("/:id",
        IsLoggedin,
        validateListing,
        wrapAsync(async(req,res)=>{
        
        let {id} = req.params;
        await Listing.findByIdAndUpdate(id,{...req.body.listing});
        req.flash("success","Listing Updated!");
        res.redirect(`/listings/${id}`);
    }))
    
    //delete route
    router.delete("/:id",
        IsLoggedin,
        wrapAsync(async(req,res)=>{
         let {id} = req.params;
         let deletedListing = await Listing.findByIdAndDelete(id);
         console.log(deletedListing);
         req.flash("success","Listing Deleted!");
         res.redirect("/listings");
    
    }))
    module.exports = router;