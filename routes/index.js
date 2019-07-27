var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

// Landing Page
router.get('/', function (req, res) {
    res.render("home")
  })

// Register form
router.get("/register", function(req,res){
    res.render("register");
});

router.post("/", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/pets");
        });
    });
});

//Login
router.get("/login", function(req, res){
    res.render("login");
})

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/users/",
        failureRedirect: "login"
    }), function(req, res){
        
    });
    
//Logout
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;