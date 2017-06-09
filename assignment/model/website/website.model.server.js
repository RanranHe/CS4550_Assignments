/**
 * Created by Ranran on 2017/6/9.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server');

    var websiteModel = mongoose.model('websites', websiteSchema);

    websiteModel.createWebsite = createWebsite;
    websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
    websiteModel.findWebsiteById = findWebsiteById;
    websiteModel.updateWebsite = updateWebsite;
    websiteModel.deleteWebsite = deleteWebsite;

    module.exports = websiteModel;

    return {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };


    function createWebsite(website) {
        return websiteModel.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return websiteModel.find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return websiteModel.findOne({_id: websiteId});
    }

    function updateWebsite(websiteId, newWebsite) {
        // // console.log("model newWebsite: " + newWebsite.name);
        // console.log("model newWebsite: " + newWebsite.description);
        // return websiteModel.update(
        //     {_id: websiteId},
        //     {$set: {
        //         name: newWebsite.name,
        //         description: newWebsite.description
        //         }
        //     });
        console.log("model: " + newWebsite.name);
        return websiteModel.update(
            {_id: websiteId},
            {$set: newWebsite});
    }

    function deleteWebsite(websiteId) {
        return websiteModel.remove({_id: websiteId});
    }
};