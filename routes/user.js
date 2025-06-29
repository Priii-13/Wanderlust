const express = require("express");
const router = express.Router();
const passport = require("passport");
const {saveRedirectUrl} = require("../middlewares.js");
const userController = require("../controllers/user.js");

router
.route("/signup")
.get(userController.renderSignup)
.post(userController.signUp);

router
.route("/login")
.get(userController.renderLogin)
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true
    }),
    userController.Login);


router.get("/logout",userController.logout);

module.exports = router;