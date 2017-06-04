module.exports = function (app) {

    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/page/:pageId", findPageById);
    app.get("/api/website/:websiteId/page", findPagesByWebsiteId);
    app.put("/api/page/:pageId", updatePage);
    app.delete('/api/page/:pageId', deletePage);

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];

    function findAllPagesForWebsite(req, res) {
        var results = [];
        for (var p in pages) {
            if (pages[p].websiteId === req.params.websiteId)
                results.push(pages[p]);
        }
        res.json(results);
    }

    function createPage(req, res) {
        var websiteId = req.body.websiteId;
        var page = req.body.page;
        page.websiteId = websiteId;
        pages.push(page);
        res.json(pages);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var u in pages) {
            if (pages[u]._id === pageId) {
                res.json(pages[u]);
            }
        }
    }

    function findPagesByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        var result = [];
        for (var u in pages) {
            if (pages[u].websiteId === websiteId) {
                result.push(pages[u]);
            }
        }
        res.json(result);
    }

    function updatePage(req, res) {
        var pageId = req.body.pageId;
        var page = req.body.page;
        for (var u in pages) {
            if (pages[u]._id === pageId) {
                pages[u] = page;
                res.sendStatus(200);
            }
        }
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        var page = pages.find(function (page) {
            return page._id === pageId;
        });
        var index = pages.indexOf(page);
        pages.splice(index, 1);
        res.sendStatus(200);
    }
};
