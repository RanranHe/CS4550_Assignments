module.exports = function (app, models) {
    var websiteModel = models.websiteModel;

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
        {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    ];

    function findAllWebsitesForUser(req, res) {
        websiteModel
            .findAllWebsitesForUser(req.params.userId)
            .then(function (websites) {
                res.json(websites);
            });
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json(website);
                },
                function (err) {
                    res.send(null);
                    // res.status(400).send(err);
                }
            );
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var website = req.body;

        websiteModel
            .updateWebsite(websiteId, website)
            .then(function (response) {
                res.json(response);
            });
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (status) {
                    res.json(200);
                },
                function (err) {
                    res.status(404).send(err);
                }
            );
    }

    function createWebsite(req, res) {
        var userId = req.body.userId;
        var website = req.body;
        var name = req.body.website.name;
        var description = req.body.website.description;
        website.name = name;
        website.description = description;
        website._user = userId;

        websiteModel
            .createWebsite(website)
            .then(
                function (website) {
                    res.sendStatus(200);
                });
    }
};
