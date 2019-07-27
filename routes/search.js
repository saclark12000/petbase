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
    Pet.find({
        adoptable: {
            $eq: true
        },
        $text:
        {
        $search: req.body.search,
        $language: "en",
        $caseSensitive: false,
        $diacriticSensitive: false
        }
        }, function(err, searchResults){
        if(err){
            console.log(err)
        } else {
            res.render("search/index", {results: searchResults, term: req.body.search});
        }
    });
});

module.exports = router;