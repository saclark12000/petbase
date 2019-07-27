var mongoose    = require("mongoose"),
    passport    = require('passport');

var Pet = require("./models/pet");
var User = require("./models/user");

var userData = [
    {
        username: "petbaseadmin",
        password: "password"
    }
]
 
var data = [
    {
        name: "Rocco", 
        images: { 
            'cover' : "/uploads/imgs/seed/5cc363c17c535d4a5cf402b1.jpg",
            },
        description: "Friendly, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "dog",
        breed: ["Vizsla", "Whippet"],
        adoptable: true
    },
    {
        name: "Ace", 
        images: { 
            'cover' : "/uploads/imgs/seed/5cc3662b77f820725077a5fe.jpg",
            },
        description: "Friendly, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "dog",
        breed: ["Toy Poodle"]
    },
    {
        name: "Bandit", 
        images: { 
            'cover' : "/uploads/imgs/seed/5cc3655877f820725077a5f5.jpg",
            },
        description: "Friendly, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "dog",
        breed: ["Wire Fox Terrier"]
    },
    {
        name: "Benji", 
        images: { 
            'cover' : "/uploads/imgs/seed/5cc3657177f820725077a5f8.jpg",
            },
        description: "Friendly, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "dog",
        breed: ["Saluki", "Rat Terrier"],
        adoptable: true
    },
    {
        name: "Midnight", 
        images: { 
            'cover' : "/uploads/imgs/seed/5cc3661477f820725077a5fb.jpg",
            },
        description: "Friendly, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "dog",
        breed: ["Tuareg Sloughi", "Appenzell Mountain Dog"]
    },
    {
        name: "Cleetus", 
        images: { 
            'cover' : "/uploads/imgs/seed/5cc3664477f820725077a601.jpg",
            },
        description: "Friendly, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "dog",
        breed: ["American White Shepherd"],
        adoptable: true
    },
    {
        name: "Garf", 
        images: {
            'cover' : "/uploads/imgs/seed/5cc3790e35b3e76fb8da0d8c.jpg",
            },
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "cat",
        breed: ["Ocicat"]
    },
    {
        name: "Sanchez", 
        images: {
            'cover' : "/uploads/imgs/seed/5cc3793b35b3e76fb8da0d92.jpg",
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "cat",
        breed: ["Ocicat", "Ragdoll"],
        adoptable: true
    }, {
        name: "Molly", 
        images: {
            'cover' : "/uploads/imgs/seed/5cc3796e35b3e76fb8da0d98.jpg",
            },
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "cat",
        breed: ["Bombay", "Chartreux"]
    },
    {
        name: "Abby", 
        images: {
            'cover' : "/uploads/imgs/seed/5cc3792535b3e76fb8da0d8f.jpg",
        },
        description: "Scared of own tail. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "cat",
        breed: ["Ragdoll"],
        adoptable: true
    },{
        name: "Oscar", 
        images: {
            'cover' : "/uploads/imgs/seed/5cc3795435b3e76fb8da0d95.jpg",
            },
        description: "Active. Loves children and other pets. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "cat",
        breed: ["American Shorthair"]
    }  
]
 
function seedDB(){
//Remove all users
   User.deleteMany({},function(err){
        err ? console.log(err) : console.log("Removed all users!")
        userData.forEach(function(seed){
//Add in petbaseadmin as a user
            var newUser = new User({username: seed.username});
            User.register(newUser, seed.password, function(err, user){
                if(err){
                    console.log(err);
                    return 
                }
                passport.authenticate("local");
                console.log(seed.username + ' created...')
//Reset all pets    
                User.findOne( {username: 'petbaseadmin'}, function(err, result){
                    if (err){
                        return err;
                    } else {
//Remove all pets in database
                        Pet.deleteMany({}, function(err){
                            if(err){
                                console.log(err);
                            }
                            console.log("Removed all pets!");
//Add all pets from data array and assign to petadmin
                            // data.forEach(function(seed){
                            //     Pet.create(seed, function(err, pet){
                            //         if(err){
                            //             console.log(err)
                            //         } else {
                            //             pet.author.id = result._id
                            //             pet.author.username = result.username
                            //             console.log("Added a pet...");
                            //             pet.save();
                            //         }
                            //     });
                            // });
                        });
                    }
                });  
            });
        });
    });
}
module.exports = seedDB;