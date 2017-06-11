/**
 * Created by Ranran on 2017/6/9.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server');

    var websiteModel = mongoose.model('websites', websiteSchema);
    var userModel = require('../user/user.model.server');

    websiteModel.createWebsite = createWebsite;
    websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
    websiteModel.findWebsiteById = findWebsiteById;
    websiteModel.updateWebsite = updateWebsite;
    websiteModel.deleteWebsite = deleteWebsite;
    websiteModel.addPageToArray = addPageToArray;
    websiteModel.deletePageFromArray = deletePageFromArray;

    module.exports = websiteModel;

    return {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        addPageToArray: addPageToArray,
        deletePageFromArray: deletePageFromArray
    };


    function createWebsite(website) {
        return websiteModel
            .create(website)
            .then(function (website) {
                var userId = website._user;
                var websiteId = website._id;
                userModel.addWebsiteToArray(userId, websiteId);
            })
    }

    function findAllWebsitesForUser(userId) {
        return websiteModel.find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return websiteModel.findOne({_id: websiteId});
    }

    function updateWebsite(websiteId, newWebsite) {
        return websiteModel.update(
            {_id: websiteId},
            {$set: newWebsite});
    }

    function deleteWebsite(websiteId) {
        return websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                var userId = website._user;
                websiteModel
                    .remove({_id: websiteId})
                    .then(function () {
                        return userModel.deleteWebsiteFromArray(userId, websiteId);
                    })
            })

    }

    ///////////// Helper function/////////////////

    function addPageToArray(websiteId, pageId) {
        return websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                website._pages.push(pageId);
                return website.save();
            });
    }

    function deletePageFromArray(websiteId, pageId) {
        return userModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                var index = website._pages.indexOf(pageId);
                website._pages.splice(index, 1);
                return website.save();
            })
    }
};