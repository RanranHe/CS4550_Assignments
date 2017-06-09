/**
 * Created by Ranran on 2017/6/8.
 */
module.exports = function (app) {
    var mongoose = require('mongoose');
    var userModel = require("./user/user.model.server.js")(app);
    var websiteModel = require("./website/website.model.server")(app);
    var pageModel = require("./page/page.model.server.js")(app);
    var widgetModel = require("./widget/widget.model.server.js")(app);


    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };
    return models;
};
