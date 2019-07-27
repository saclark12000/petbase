var middlewareObj = {};

var Pet = require("../models/pet");
var User = require("../models/user");

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

middlewareObj.checkPetOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Pet.findById(req.params.id, function(err, foundPet){
            if(err){
                res.redirect("back");
            } else {
                if(foundPet.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

module.exports = middlewareObj;