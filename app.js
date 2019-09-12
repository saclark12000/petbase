//Dependencies
var express                 = require("express"), 
    mongoose                = require("mongoose"),
    bodyParser              = require("body-parser"),
    passport                = require('passport'),
    LocalStrategy           = require('passport-local'),
    methodOverride          = require('method-override'),
    path                    = require('path'),
    multer                  = require('multer'),
    dotenv                  = require('dotenv').config();
    aws                     = require('aws-sdk'),
    helmet                  = require('helmet');

//Models
var Pet                     = require("./models/pet");
var User                    = require("./models/user");

//Routes
var indexRoutes             = require("./routes/index"),
    userRoutes              = require("./routes/users"),
    petRoutes               = require("./routes/pets"),
    searchRoutes            = require("./routes/search");

//Database fill
// var seedDB                  = require("./seedDB");

//Mongoose
mongoose.connect(process.env.DB_ACCESS, { useNewUrlParser: true,  'useCreateIndex': true, autoIndex: true});

//app setup    
var app = express();
app.set('view engine', 'ejs');
//app.use(helmet({xssFilter: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/node_modules")));
app.use(express.static(path.join(__dirname, "/public")));
// app.use(express.static(__dirname +"/public"));
app.use(methodOverride('_method'));

// Function to clear all pets and users and fill with some clear records and the petbaseadmin
// seedDB();

//Passport Config
app.use(require('express-session')({
  secret: process.env.PASS_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

//Route Info
app.use(indexRoutes)
app.use("/pets", petRoutes);
app.use("/users", userRoutes);
app.use("/search", searchRoutes);

//Port setup to work with heroku or locally
const port = process.env.PORT || 3000

app.listen(port, function(){
    console.log("Petbase server started....");
    if (port == 3000) { console.log("http://localhost:3000/")}
});