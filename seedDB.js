var mongoose    = require("mongoose"),
    passport    = require('passport'),
    aws         = require('aws-sdk'),
    fs          = require('fs');

var Pet = require("./models/pet");
var User = require("./models/user");

var userData = [
    {
        username: "petbaseadmin",
        _id: mongoose.Types.ObjectId("5d38cb5b77de6b2648b8859f"),
        password: "password"
    }
] 
 
var data = [
    {
        name: "Rocco", 
        images: { 
            'cover' : "userUploads/5d38cb5b77de6b2648b8859f/imgs/5cc363c17c535d4a5cf402b1.jpg",
            },
        description: "Friendly, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "dog",
        breed: ["Vizsla", "Whippet"],
        adoptable: true
    },
    {
        name: "Ace", 
        images: { 
            'cover' : "userUploads/5d38cb5b77de6b2648b8859f/imgs/5cc3662b77f820725077a5fe.jpg",
            },
        description: "Friendly, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "dog",
        breed: ["Toy Poodle"]
    },
    {
        name: "Bandit", 
        images: { 
            'cover' : "userUploads/5d38cb5b77de6b2648b8859f/imgs/5cc3655877f820725077a5f5.jpg",
            },
        description: "Friendly, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "dog",
        breed: ["Wire Fox Terrier"]
    },
    {
        name: "Benji", 
        images: { 
            'cover' : "userUploads/5d38cb5b77de6b2648b8859f/imgs/5cc3657177f820725077a5f8.jpg",
            },
        description: "Friendly, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "dog",
        breed: ["Saluki", "Rat Terrier"],
        adoptable: true
    },
    {
        name: "Midnight", 
        images: { 
            'cover' : "userUploads/5d38cb5b77de6b2648b8859f/imgs/5cc3661477f820725077a5fb.jpg",
            },
        description: "Friendly, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "dog",
        breed: ["Tuareg Sloughi", "Appenzell Mountain Dog"]
    },
    {
        name: "Cleetus", 
        images: { 
            'cover' : "userUploads/5d38cb5b77de6b2648b8859f/imgs/5cc3664477f820725077a601.jpg",
            },
        description: "Friendly, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "dog",
        breed: ["American White Shepherd"],
        adoptable: true
    },
    {
        name: "Garf", 
        images: {
            'cover' : "userUploads/5d38cb5b77de6b2648b8859f/imgs/5cc3790e35b3e76fb8da0d8c.jpg",
            },
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "cat",
        breed: ["Ocicat"]
    },
    {
        name: "Sanchez", 
        images: {
            'cover' : "userUploads/5d38cb5b77de6b2648b8859f/imgs/5cc3793b35b3e76fb8da0d92.jpg",
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "cat",
        breed: ["Ocicat", "Ragdoll"],
        adoptable: true
    }, {
        name: "Molly", 
        images: {
            'cover' : "userUploads/5d38cb5b77de6b2648b8859f/imgs/5cc3796e35b3e76fb8da0d98.jpg",
            },
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "cat",
        breed: ["Bombay", "Chartreux"]
    },
    {
        name: "Abby", 
        images: {
            'cover' : "userUploads/5d38cb5b77de6b2648b8859f/imgs/5cc3792535b3e76fb8da0d8f.jpg",
        },
        description: "Scared of own tail. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "cat",
        breed: ["Ragdoll"],
        adoptable: true
    },{
        name: "Oscar", 
        images: {
            'cover' : "userUploads/5d38cb5b77de6b2648b8859f/imgs/5cc3795435b3e76fb8da0d95.jpg",
            },
        description: "Active. Loves children and other pets. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        species: "cat",
        breed: ["American Shorthair"]
    }  
]

// Remove all user img uploads

function deleteUploads(userId){
    var params = {
      Bucket: "petbase",
      Prefix: 'userUploads/' + userId + '/imgs/'
    };

    var s3 = new aws.S3(params);
  
    s3.listObjects(params, function(err, data) {
        if (err) return err;
        if (data.Contents.length == 0){
            console.log(userId + ' completed');
             return userId + ' completed';
        }
  
        params = {Bucket: "petbase"};
        params.Delete = {Objects:[]};
  
        data.Contents.forEach(function(content) {
            params.Delete.Objects.push({Key: content.Key});
        });
  
        s3.deleteObjects(params, function(err, data) {
            if (err){
                console.log(err);
                return err;
            } else {
                console.log(userId + ' completed');
                return userId + ' completed';
            }
            //if(data.Contents.length == 1000) emptyBucket(petbase, callback);
        });
    });
};

// Add img files for petbaseadmin seeds
var seedDir = "./public/seed/imgs/";
var seededImgs = [
    seedDir + "5cc363c17c535d4a5cf402b1.jpg",
    seedDir + "5cc3662b77f820725077a5fe.jpg",
    seedDir + "5cc3790e35b3e76fb8da0d8c.jpg",
    seedDir + "5cc3793b35b3e76fb8da0d92.jpg",
    seedDir + "5cc3796e35b3e76fb8da0d98.jpg",
    seedDir + "5cc3655877f820725077a5f5.jpg",
    seedDir + "5cc3657177f820725077a5f8.jpg",
    seedDir + "5cc3661477f820725077a5fb.jpg",
    seedDir + "5cc3664477f820725077a601.jpg",
    seedDir + "5cc3792535b3e76fb8da0d8f.jpg",
    seedDir + "5cc3795435b3e76fb8da0d95.jpg"
];

function seedImgUploads(file){
    
    fs.readFile(file, (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: 'petbase',
            Key: 'userUploads/5d38cb5b77de6b2648b8859f/imgs/' + file.slice(seedDir.length,),
            ACL: 'public-read-write',
            Body: data
        };

        var s3 = new aws.S3(); 

        s3.upload(params, function(s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)
        });
     });
};
 
function seedDB(){
// Remember! Image removal/upload needs to be put into a promise or ran one at a time.

//Remove all user uploaded imgs
// User.find({}, function(err, users){
//     if (err){
//         console.log(err)
//         return(err)
//     } else {
//         users.forEach(user =>{
//             deleteUploads(user._id);
//         });
//     }
// });

//Add petbaseadmin uploaded imgs
// seededImgs.forEach(file => seedImgUploads(file));

// //Remove all users
//    User.deleteMany({},function(err){
//         err ? console.log(err) : console.log("Removed all users!")
//         userData.forEach(function(seed){
// //Add in petbaseadmin as a user
//             var newUser = new User({username: seed.username, _id: seed._id});
//             User.register(newUser, seed.password, function(err, user){
//                 if(err){
//                     console.log(err);
//                     return 
//                 }
//                 passport.authenticate("local");
//                 console.log(seed.username + ' created...')
// //Reset all pets    
//                 User.findOne( {username: 'petbaseadmin'}, function(err, result){
//                     if (err){
//                         return err;
//                     } else {
// //Remove all pets in database
//                         Pet.deleteMany({}, function(err){
//                             if(err){
//                                 console.log(err);
//                             }
//                             console.log("Removed all pets!");
// //Add all pets from data array and assign to petadmin
//                             data.forEach(function(seed){
//                                 Pet.create(seed, function(err, pet){
//                                     if(err){
//                                         console.log(err)
//                                     } else {
//                                         pet.author.id = result._id
//                                         pet.author.username = result.username
//                                         console.log("Added a pet...");
//                                         pet.save();
//                                     }
//                                 });
//                             });
//                         });
//                     }
//                 });  
//             });
//         });
//     });
}
module.exports = seedDB;