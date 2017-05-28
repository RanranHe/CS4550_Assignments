/**
 * Created by Ranran on 2017/5/27.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];

    function PageService() {
        return {
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            createPage: createPage,
            updatePage: updatePage,
            deletePage: deletePage,
            findAllPagesForUser: findAllPagesForUser
        };

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPagesByWebsiteId(websiteId) {
            var result = [];
            for (var u in pages) {
                if (pages[u].websiteId === websiteId) {
                    result.push(pages[u]);
                }
            }
            return result;
        }

        function findPageById(pageId) {
            for (var u in pages) {
                if (pages[u]._id === pageId) {
                    return pages[u];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var u in pages) {
                if (pages[u]._id === pageId) {
                    pages[u] = page;
                    return true;
                }
            }
            return false;
        }

        function deletePage(pageId) {
            for (var u in pages) {
                if (pages[u]._id === pageId) {
                    pages.splice(u, 1);
                    return true;
                }
            }
            return false;
        }

        function findAllPagesForUser(websiteId) {
            var resultSet = [];
            for (var w in pages) {
                if (pages[w].websiteId === websiteId) {
                    console.log(websiteId);
                    // websites[w].created = new Date();
                    // websites[w].updated = new Date();
                    resultSet.push(pages[w]);
                }
            }
            console.log("service" + resultSet);
            return resultSet;
        }
    }
})();
