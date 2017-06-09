module.exports = function (app, models) {
    var widgetModel = models.widgetModel;

    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put('/page/:pageId/widget', sortWidget);

    function createWidget(req, res) {
        var pageId = req.body.pageId;
        var widget = req.body;

        var widgetType = req.body.widget.widgetType;
        widget.widgetType = widgetType;
        widget._page = pageId;


        widgetModel
            .createWidget(widget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (err) {
                    // res.status(400).send(err);
                }
            );
    }

    function findWidgetsByPageId(req, res) {
        widgetModel
            .findWidgetsByPageId(req.params.pageId)
            .then(function (widgets) {
                res.json(widgets);
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
                function (err) {
                    res.send(null);
                    // res.status(400).send(err);
                }
            );
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
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
                res.sendStatus(200);
            }
        }
    }

    function sortWidget(req, res) {
        var storedWidgets = [];

        var initial = req.query['initial'];
        var final = req.query['final'];

        for (var i = widgets.length - 1; i >= 0; i--) {
            if (widgets[i].pageId === req.params.pageId) {
                storedWidgets.unshift(widgets[i]);
                widgets.splice(i, 1);
            }
        }
        var widget = storedWidgets[initial];
        storedWidgets.splice(initial, 1);
        storedWidgets.splice(final, 0, widget);
        widgets = widgets.concat(storedWidgets);
        res.sendStatus(200);
    }


    // For upload Image in widget-image

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
            .then(
                function (widget) {
                    widgetHolder = JSON.parse(JSON.stringify(widget));
                    widgetHolder.url = "/uploads/" + filename;

                    widgetModel
                        .updateWidget(widgetId, widgetHolder)
                        .then(
                            function (widget) {
                                res.redirect("/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                            },
                            function (err) {
                                res.statusCode(400);
                            })
                })
    }
};
