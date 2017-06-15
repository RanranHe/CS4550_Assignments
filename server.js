// var app = require('./express');
//
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var session      = require('express-session');

var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
// app.use(session({ secret: process.env.SESSION_SECRET }));
var secret = "mysecret";
if(process.env.SESSION_SECRET) {
    secret = process.env.SESSION_SECRET
}
app.use(session({ secret: secret }));

app.use(passport.initialize());
app.use(passport.session());


require ("./test/app.js")(app);
require('./assignment/app')(app);

var port = process.env.PORT || 3000;

app.listen(port);