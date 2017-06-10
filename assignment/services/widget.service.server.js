module.exports = function (app, models) {
    var widgetModel = models.widgetModel;

    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put('/api/page/:pageId/widget', reorderWidget);

    function createWidget(req, res) {
        var pageId = req.body.pageId;
        var widget = req.body;

        widget.widgetType = req.body.widget.widgetType;
        widget._page = pageId;

        widgetModel
            .createWidget(widget)
            .then(
                function (widget) {
                    res.json(widget);
                });
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params['pageId'];

        widgetModel
            .findWidgetsByPageId(pageId)
            .then(function (widgetIds) {
                widgetModel
                    .findWidgetsByIds(widgetIds)
                    .then(function (widgets) {
                        var finalHashWidgetList = getHashedList(widgets);
                        // Helper function
                        function getHashedList(widgets) {
                            var hashWidgetList = [];
                            for (var i in widgets) {
                                hashWidgetList[widgets[i]._id] = widgets[i];
                            }
                            return hashWidgetList;
                        }

                        var widgetList = [];

                        for (var i = 0; i < widgetIds.length; i++) {
                            var widgetId = widgetIds[i];
                            var widget = finalHashWidgetList[widgetId];
                            widgetList.push(widget);
                        }
                        res.json(widgetList);
                    })
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function () {
                    res.send(null);
                });
    }

    function updateWidget(req, res) {
        var widgetId = req.params['widgetId'];
        var widget = req.body.widget;

        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (response) {
                res.json(response);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(
                function () {
                    res.json(200);
                },
                function (err) {
                    res.status(404).send(err);
                });
    }

    function reorderWidget(req, res) {
        var pageId = req.params['pageId'];
        var start = parseInt(req.query.initial);
        var end = parseInt(req.query.final);

        widgetModel.reorderWidget(pageId, start, end)
            .then(function () {
                res.sendStatus(200);
            });
    }

    /////////////// Upload Image in Widget Image /////////////////////

    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;
        if (myFile === undefined) {
            res.redirect("/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
            return;
        }
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var widgetHolder;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                widgetHolder = JSON.parse(JSON.stringify(widget));
                widgetHolder.url = "/uploads/" + filename;

                widgetModel
                    .updateWidget(widgetId, widgetHolder)
                    .then(
                        function (widget) {
                            res.redirect("/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                        },
                        function () {
                            res.statusCode(400);
                        })
            })
    }
};
