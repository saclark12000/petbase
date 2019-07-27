var express = require("express"),
    multer  = require('multer'),
    path    = require('path'),
    mongoose = require('mongoose'),
    fs       = require('fs');
var router = express.Router({ mergeParams: true });
var User = require("../models/user");
var Pet = require("../models/pet");
var middleware = require("../middleware");



//Index route, user profile page
router.get("/", middleware.isLoggedIn, function(req, res){
    if(mongoose.Types.ObjectId.isValid(req.user._id)){
        Pet.find({
            'author.id' : req.user._id
        }, function(err, searchResults){
            if(err){
                console.log(err);
            }else {
                // res.send(searchResults)
                res.render("users/index", {results: searchResults});
            }
        // User.findById(req.user._id, function(err, foundUser){
        //     if(err){
        //         console.log(err)
        //     } else {
        //         res.render("users/index", {user: foundUser});
        //     }
        });
    };
});

// Register form
router.get("/register", function(req,res){
    res.render("register");
});

//New User Register
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

// Edit pet
// router.get("/:id/edit", middleware.checkPetOwnership, function(req, res){
//     Pet.findById(req.params.id, function(err, foundPet){
//         res.render("pets/edit", {pet: foundPet});
//     });
// });

//Update pet
// router.put("/:id", middleware.checkPetOwnership, upload.single('cover'), function(req, res){
//     //Sends uploaded file url out, processes the file and gets resized image url back
//     if (req.file) {
//         var coverURL = imgMan.processImg(req.file.path.slice(6));
//     }
//     Pet.findByIdAndUpdate(req.params.id, req.body.pet, function(err, foundPet){
//         if(err){
//             console.log(err);
//         } else {
//             if (req.file) {
//                 foundPet.images.cover = coverURL;
//             }
//             foundPet.save();
//             res.redirect("/pets/" + req.params.id);
//         }
//     });
// });

//Destroy pet
// router.delete("/:id", function(req, res){
//     Pet.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             res.redirect("/");
//         } else {
//             res.redirect("/pets");
//         }
//     });
// });

module.exports = router;