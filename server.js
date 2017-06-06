// var app = require('./express');
//
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencooded({ extended: true }));


//
//
//
// app.use(app.express.static(__dirname + '/public'));
//
// require ("./test/app.js")(app);
// require('./assignment/app')(app);
//
// app.listen(process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);
require('./assignment/app')(app);

var port = process.env.PORT || 3000;

app.listen(port);