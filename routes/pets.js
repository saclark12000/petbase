var express = require("express"),
    multer  = require('multer'),
    s3Storage = require('multer-sharp-s3'),
    aws = require('aws-sdk'),
    path    = require('path'),
    mongoose = require('mongoose'),
    sanitizeHtml = require('sanitize-html');
var router = express.Router({ mergeParams: true });
var Pet = require("../models/pet");
var middleware = require("../middleware");
var imgMan = require('../public/js/pets/image-manipulation');

//Index route, all pets list
router.get("/", function(req, res){
    res.redirect('/search/')
});

//New route
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("pets/new");
});

//Create
router.post("/", middleware.isLoggedIn, imgMan.upload.single('cover'), function(req, res){
    Pet.create(req.body.pet, function(err, newPet){
        if(err) {
            console.log(err);
        }else {
            //Sends uploaded file url out, processes the file and gets resized image url back
            newPet.images.cover = req.file.key;
            newPet.author.id = req.user._id;
            newPet.author.username = req.user.username;
            newPet.description = sanitizeHtml(req.body.pet.description.replace(/\'|\"|\`/g, "\'"), {
                allowedTags: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'ul', 'ol', 'nl',
                    'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br' ]
                });
            newPet.save();
            res.redirect("/pets/" + newPet.id);
        }
    });
});

//Show
router.get("/:id", function(req, res){
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        Pet.findById(req.params.id, function(err, foundPet){
            if(err){
                console.log(err)
            } else {
                res.render("pets/show", {pet: foundPet});
            }
        });
    };
});

// Edit pet
router.get("/:id/edit", middleware.checkPetOwnership, function(req, res){
    Pet.findById(req.params.id, function(err, foundPet){
        res.render("pets/edit", {pet: foundPet});
    });
});

//Update pet
router.put("/:id", middleware.checkPetOwnership, imgMan.upload.single('cover'), function(req, res){
    
    Pet.findByIdAndUpdate(req.params.id, req.body.pet, function(err, foundPet){
        if(err){
            console.log(err);
        } else {
            if (req.file) {
                //Removes old cover image
                imgMan.deleteFile(foundPet.images.cover);
                //Sets url for cover image to uploaded image file
                foundPet.images.cover = req.file.key;
            }
            foundPet.description = sanitizeHtml(req.body.pet.description.replace(/\'|\"|\`/g, "\'"), {
                allowedTags: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'ul', 'ol', 'nl',
                    'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br' ]
                });
            foundPet.save();
            res.redirect("/users/");
        }
    });
});

//Destroy pet
router.delete("/:id", middleware.checkPetOwnership, function(req, res){
    Pet.findByIdAndRemove(req.params.id, function(err, foundPet){
        if(err){
            console.log(err)
        } else {
            imgMan.deleteFile(foundPet.images.cover);
            res.redirect("/users/");
        }
    });
});

module.exports = router;