// var app = require('../express');

module.exports = function (app) {
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


