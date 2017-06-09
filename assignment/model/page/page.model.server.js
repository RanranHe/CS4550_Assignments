/**
 * Created by Ranran on 2017/6/9.
 */
var mongoose = require('mongoose');
module.exports = function () {
    var pageSchema = require("./page.schema.server");
    var pageModel = mongoose.model("pageModel", pageSchema);

    pageModel.createPage = createPage;
    pageModel.findPagesByWebsiteId = findPagesByWebsiteId;
    pageModel.updatePage = updatePage;
    pageModel.findPageById = findPageById;
    pageModel.deletePage = deletePage;

    module.exports = pageModel;

    return {
        createPage: createPage,
        findPagesByWebsiteId: findPagesByWebsiteId,
        updatePage: updatePage,
        findPageById: findPageById,
        deletePage: deletePage
    };

    function createPage(page) {
        return pageModel.create(page);

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
        return pageModel.remove({_id: pageId});

    }
};