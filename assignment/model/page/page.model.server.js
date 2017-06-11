/**
 * Created by Ranran on 2017/6/9.
 */
var mongoose = require('mongoose');
module.exports = function () {
    var pageSchema = require("./page.schema.server");
    var pageModel = mongoose.model("pageModel", pageSchema);
    var websiteModel = require('../website/website.model.server');

    pageModel.createPage = createPage;
    pageModel.findPagesByWebsiteId = findPagesByWebsiteId;
    pageModel.updatePage = updatePage;
    pageModel.findPageById = findPageById;
    pageModel.deletePage = deletePage;
    // Helper function
    pageModel.addWidgetToArray = addWidgetToArray;
    pageModel.deleteWidgetFromArray = deleteWidgetFromArray;

    module.exports = pageModel;

    return {
        createPage: createPage,
        findPagesByWebsiteId: findPagesByWebsiteId,
        updatePage: updatePage,
        findPageById: findPageById,
        deletePage: deletePage,
        // Helper function
        addWidgetToArray: addWidgetToArray,
        deleteWidgetFromArray: deleteWidgetFromArray
    };

    function createPage(page) {
        return pageModel
            .create(page)
            .then(function (page) {
                var websiteId = page._website;
                var pageId = page._id;
                websiteModel.addPageToArray(websiteId, pageId);
            })
    }

    function findPagesByWebsiteId(websiteId) {
        return pageModel.find({_website: websiteId});

    }

    function findPageById(pageId) {
        return pageModel.findOne({_id: pageId});

    }

    function updatePage(pageId, page) {
        return pageModel.update(
            {_id: pageId},
            {$set: page});
    }

    function deletePage(pageId) {
        return pageModel
            .findPageById(pageId)
            .then(function (page) {
                var websiteId = page._website;
                pageModel
                    .remove({_id: pageId})
                    .then(function () {
                        return websiteModel.deletePageFromArray(websiteId, pageId)
                    })
            })
    }

    ///////////// Helper function/////////////////

    function addWidgetToArray(pageId, widgetId) {
        return pageModel.findPageById(pageId)
            .then(function (page) {
                page._widgets.push(widgetId);
                return page.save();
            });
    }

    function deleteWidgetFromArray(pageId, widgetId) {
        return pageModel
            .findPageById(pageId)
            .then(function (page) {
                var index = page._widgets.indexOf(widgetId);
                page._widgets.splice(index, 1);
                return page.save();
            })
    }
};