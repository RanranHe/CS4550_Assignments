// var app = require('../express');

module.exports = function (app) {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;
    mongoose.createConnection('mongodb://127.0.0.1/webdev_assignment');

    if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
        var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
        var password = process.env.MLAB_PASSWORD_WEBDEV;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds137281.mlab.com:37281/heroku_wzbmmppf'; // user yours
    }
    mongoose.connect(connectionString);

    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);


    app.get('/goodbye', sayHello);
    app.get('/websites', sendWebsites);

    function sendWebsites(req, res) {
        var websites = [
            {name:'facebook'},
            {name:'twitter'},
            {name:'linkedin'}
        ];
        res.send(websites);
    }

    function sayHello() {
        console.log("Hello");
    }

};


