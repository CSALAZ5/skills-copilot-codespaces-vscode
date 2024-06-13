// Create web server
// npm install express
// npm install body-parser
// npm install mongoose
// npm install ejs
// npm install express-sanitizer
// npm install method-override
// npm install express-session
// npm install passport
// npm install passport-local
// npm install passport-local-mongoose
// npm install connect-flash
// npm install express-validator
// npm install async
// npm install request
// npm install nodemailer
// npm install nodemailer-smtp-transport
// npm install nodemailer-sendgrid-transport
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var flash = require("connect-flash");
var expressValidator = require("express-validator");
var async = require("async");
var request = require("request");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var sendgridTransport = require("nodemailer-sendgrid-transport");

var User = require("./models/user");
var Comment = require("./models/comment");

// Connect to the database
mongoose.connect("mongodb://localhost/comments");

// Set up the app
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(flash());
app.use(expressValidator());

// Set up the express session
app.use(require("express-session")({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false
}));

// Set up passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to pass the user to
