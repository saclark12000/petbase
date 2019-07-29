var express = require("express"),
    multer  = require('multer'),
    s3Storage = require('multer-sharp-s3'),
    aws = require('aws-sdk'),
    path    = require('path'),
    mongoose = require('mongoose');
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

// // multer-sharp-s3 config
// aws.config.update({
//     secretAccessKey: process.env.AWSSECRETKEY,
//     accessKeyId: process.env.AWSKEYID,
//     region: 'us-east-2'
//     });

// var s3 = new aws.S3();

// const storage = s3Storage({
//     s3,
//     Bucket: 'petbase',
//     Key: function (req, file, cb) {
//         console.log("USER ID ==>", req.user._id);
//         console.log("userUploads/" + req.user._id + "/imgs/" + mongoose.Types.ObjectId() + path.extname(file.originalname))
//         cb(null, "userUploads/" + req.user._id + "/imgs/" + mongoose.Types.ObjectId() + path.extname(file.originalname));
//         },
//     resize: {
//       width: 250,
//       height: 250,
//       options: {fit: 'cover'}
//     }
//   });

// const upload = multer({ storage: storage });

//Create
router.post("/", middleware.isLoggedIn, imgMan.upload.single('cover'), function(req, res){
    Pet.create(req.body.pet, function(err, newPet){
        if(err) {
            console.log(err);
        }else {
            //Sends uploaded file url out, processes the file and gets resized image url back
            //console.log("FILE PATH ===>   ", req.file.key)
            newPet.images.cover = req.file.key;
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

// // Remove Cover Image
// function deleteFile(file) {
//     console.log('removing ==>', file)
//     var params = {
//         Bucket: 'petbase',
//         Key: file
//     };
//     s3.deleteObject(params, function (err, data) {
//         if (err) console.log(err, err.stack); // an error occurred
//         else     console.log(data);           // successful response
//     });
// }


//Update pet
router.put("/:id", middleware.checkPetOwnership, imgMan.upload.single('cover'), function(req, res){
    
    Pet.findByIdAndUpdate(req.params.id, req.body.pet, function(err, foundPet){
        if(err){
            console.log(err);
        } else {
            if (req.file) {
                //Removes old cover image
                //console.log('updating to remove', foundPet.images.cover);
                imgMan.deleteFile(foundPet.images.cover);
                //Sends uploaded file url out, processes the file and gets resized image url back
                foundPet.images.cover = req.file.key;
            }
            foundPet.save();
            res.redirect("/users/");
        }
    });
});

//Destroy pet
router.delete("/:id", function(req, res){
    Pet.findByIdAndRemove(req.params.id, function(err, foundPet){
        if(err){
            res.redirect("/");
        } else {
            imgMan.deleteFile(foundPet.images.cover);
            res.redirect("/users/");
        }
    });
});

module.exports = router;