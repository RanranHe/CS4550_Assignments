module.exports = function (app, models) {

    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put('/page/:pageId/widget', sortWidget);

    widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function createWidget(req, res) {
        var pageId = req.body.pageId;
        var widget = req.body.widget;
        widget.pageId = pageId;
        widgets.push(widget);
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;
        var result = [];
        for (var i in widgets) {
            if(widgets[i].pageId === pageId) {
                result.push(widgets[i]);
            }
        }
        res.json(result);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if(widgets[i]._id === widgetId) {
                res.json(widgets[i]);
            }
        }
    }

    function updateWidget(req, res) {
        var widgetId = req.body.widgetId;
        var widget = req.body.widget;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i] = widget;
                res.sendStatus(200);
            }
        }
    }
    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if(widgets[i]._id === widgetId) {
                widgets.splice(i,1);
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
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });
        widget.url = '/uploads/' + filename;

        var callbackUrl = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

        res.redirect(callbackUrl);
    }
};
