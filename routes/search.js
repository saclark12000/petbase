var express = require("express");
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

    if (req.body.search.toLowerCase() == "dog" || req.body.search.toLowerCase() == "cat"){
        Pet.find({
            adoptable: {
                $eq: true
            },
            species : {$eq: req.body.search.toLowerCase()}
            }, function(err, searchResults){
            if(err){
                console.log(err)
            } else {
                res.render("search/index", {results: searchResults, term: req.body.search});
            }
        });
    } else {
        Pet.find({
            adoptable: {
                $eq: true
            },
            $or : [{
                species: {
                    $regex: req.body.search.split(" ").map(str => "("+str+")").join('|'),
                    $options: "i"
                }},{
                breed: {
                    $regex: req.body.search.split(" ").map(str => "("+str+")").join('|'),
                    $options: "i"
                }},{
                description: {
                    $regex: req.body.search.split(" ").map(str => "("+str+")").join('|'),
                    $options: "i"
                }},{
                name: {
                    $regex: req.body.search.split(" ").map(str => "("+str+")").join('|'),
                    $options: "i"
                }}

            ]
            }, function(err, searchResults){
            if(err){
                console.log(err)
            } else {
                res.render("search/index", {results: searchResults, term: req.body.search});
            }
        });
    }
});

module.exports = router;