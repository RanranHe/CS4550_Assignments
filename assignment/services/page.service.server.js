module.exports = function (app, models) {

    var pageModel = models.pageModel;

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

    function createPage(req, res) {
        var websiteId = req.body.websiteId;
        var page = req.body;
        var name = req.body.page.name;
        var description = req.body.page.description;
        page.name = name;
        page.description = description;
        page._website = websiteId;

        pageModel
            .createPage(page)
            .then(
                function (page) {
                    res.sendStatus(200);
                },
                function (err) {
                    // res.status(400).send(err);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.send(null);
                    // res.status(400).send(err);
                }
            );
    }

    function findPagesByWebsiteId(req, res) {
        pageModel
            .findPagesByWebsiteId(req.params.websiteId)
            .then(function (websites) {
                res.json(websites);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params['pageId'];
        var page = req.body.page;

        pageModel
            .updatePage(pageId, page)
            .then(function (response) {
                res.json(response);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(function (status) {
                    res.json(200);
                },
                function (err) {
                    res.status(404).send(err);
                }
            );
    }
};
