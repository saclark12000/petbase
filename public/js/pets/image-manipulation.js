var express = require("express"),
    multer  = require('multer'),
    s3Storage = require('multer-sharp-s3'),
    aws = require('aws-sdk'),
    path    = require('path'),
    mongoose = require('mongoose');

imgMan = {};

// multer-sharp-s3 config
aws.config.update({
    secretAccessKey: process.env.AWSSECRETKEY,
    accessKeyId: process.env.AWSKEYID,
    region: 'us-east-2'
    });

var s3 = new aws.S3();

const storage = s3Storage({
    s3,
    Bucket: 'petbase',
    Key: function (req, file, cb) {
        //console.log("USER ID ==>", req.user._id);
        //console.log("userUploads/" + req.user._id + "/imgs/" + mongoose.Types.ObjectId() + path.extname(file.originalname))
        cb(null, "userUploads/" + req.user._id + "/imgs/" + mongoose.Types.ObjectId() + path.extname(file.originalname));
        },
    resize: {
      width: 250,
      height: 250,
      options: {fit: 'cover'}
    }
  });

// Upload Middleware
imgMan.upload = multer({ storage: storage });

// Remove Cover Image
imgMan.deleteFile = function(file) {
    //console.log('removing ==>', file)
    var params = {
        Bucket: 'petbase',
        Key: file
    };
    s3.deleteObject(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     null;           // successful response
    });
}

module.exports = imgMan;