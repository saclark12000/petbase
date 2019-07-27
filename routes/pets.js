var express = require("express"),
    multer  = require('multer'),
    path    = require('path'),
    mongoose = require('mongoose'),
    fs       = require('fs');
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

// Set Storage Engine
var storage = multer.diskStorage({
    destination: './public/uploads/imgs/',
    filename: function(req, file, cb){
        var imgId = mongoose.Types.ObjectId();
        cb(null,  imgId + path.extname(file.originalname));
    }
});

// Init Upload
var upload = multer({
storage: storage
})

//Create
router.post("/", middleware.isLoggedIn, upload.single('cover'), function(req, res){
    Pet.create(req.body.pet, function(err, newPet){
        if(err) {
            console.log(err);
        }else {
            //Sends uploaded file url out, processes the file and gets resized image url back
            newPet.images.cover = imgMan.processImg(req.file.path.slice(6));
            newPet.author.id = req.user._id;
            newPet.author.username = req.user.username;
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
router.put("/:id", middleware.checkPetOwnership, upload.single('cover'), function(req, res){
    
    Pet.findByIdAndUpdate(req.params.id, req.body.pet, function(err, foundPet){
        if(err){
            console.log(err);
        } else {
            if (req.file) {
                //Removes old cover image
                imgMan.removeImg(foundPet.images.cover);
                //Sends uploaded file url out, processes the file and gets resized image url back
                foundPet.images.cover = imgMan.processImg(req.file.path.slice(6));
            }
            foundPet.save();
            res.redirect("/users/");
        }
    });
});

//Destroy pet
router.delete("/:id", function(req, res){
    Pet.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/");
        } else {
            res.redirect("/users/");
        }
    });
});

module.exports = router;