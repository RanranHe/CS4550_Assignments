module.exports = function (app) {

    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

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
        console.log("Server: " + widget.widgetType);
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

};
