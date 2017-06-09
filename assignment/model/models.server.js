/**
 * Created by Ranran on 2017/6/8.
 */
// module.exports = function () {
//     var mongoose = require('mongoose');
//     mongoose.connect('mongodb://localhost/assignment');
//     // var userModel = require("./user/user.model.server.js")();
//     // var websiteModel = require("./website/website.model.server.js")();
//     // var pageModel = require("./page/page.model.server.js")();
//     // var widgetModel = require("./widget/widget.model.server.js")();
//
//
//
//
//     var models = {
//         // userModel: userModel,
//         // websiteModel: websiteModel,
//         // pageModel: pageModel,
//         // widgetModel: widgetModel
//     };
//
//     return models;
// };

module.exports = function (app) {
    var mongoose = require('mongoose');
    var userModel = require("./user/user.model.server.js")(app);
    var websiteModel = require("./website/website.model.server.js")(app);
    // var pageModel = require("./page/page.model.server.js")();
    // var widgetModel = require("./widget/widget.model.server.js")();


    var models = {
        userModel: userModel,
        websiteModel: websiteModel
        // pageModel: pageModel,
        // widgetModel: widgetModel
    };
    return models;
};
