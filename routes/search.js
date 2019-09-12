var express = require("express"),
    sanitizeHtml = require('sanitize-html');
var router = express.Router();
var Pet = require("../models/pet");
//var middleware = require("../middleware");

//Index route, returns results for all adoptable pets
router.get("/", function(req, res){
    Pet.find({
        adoptable: {
            $eq: true
        }
    }, function(err, searchResults){
        if(err){
            console.log(err);
        }else {
            res.render("search/index", {results: searchResults, term: false});
        }
    });
});

//Show route, returns results for all adoptable pets and text search done by user
router.post("/results", function(req, res){
    var sanitizedSearch = sanitizeHtml(req.body.search.toLowerCase());

    if (sanitizedSearch == "dog" || sanitizedSearch == "cat"){
        Pet.find({
            adoptable: {
                $eq: true
            },
            species : {$eq: sanitizedSearch}
            }, function(err, searchResults){
            if(err){
                console.log(err)
            } else {
                res.render("search/index", {results: searchResults, term: sanitizedSearch});
            }
        });
    } else {
        Pet.find({
            adoptable: {
                $eq: true
            },
            $or : [{
                species: {
                    $regex: sanitizedSearch.split(" ").map(str => "("+str+")").join('|'),
                    $options: "i"
                }},{
                breed: {
                    $regex: sanitizedSearch.split(" ").map(str => "("+str+")").join('|'),
                    $options: "i"
                }},{
                description: {
                    $regex: sanitizedSearch.split(" ").map(str => "("+str+")").join('|'),
                    $options: "i"
                }},{
                name: {
                    $regex: sanitizedSearch.split(" ").map(str => "("+str+")").join('|'),
                    $options: "i"
                }}

            ]
            }, function(err, searchResults){
            if(err){
                console.log(err)
            } else {
                res.render("search/index", {results: searchResults, term: sanitizedSearch});
            }
        });
    }
});

module.exports = router;