/**
 * Created by Ranran on 2017/5/28.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

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

    function WidgetService() {
        return {
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById:findWidgetById,
            createWidget:createWidget,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget,
            findAllWidgetsForUser:findAllWidgetsForUser
        };

        function findWidgetById(widgetId) {
            for (var u in widgets) {
                if(widgets[u]._id == widgetId) {
                    return widgets[u];
                }
            }
            return null;
        }

        function findWidgetsByPageId(pageId) {
            var result = [];
            for (var u in widgets) {
                if(widgets[u].pageId == pageId) {
                    result.push(widgets[u]);
                }
            }
            return result;
        }

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function updateWidget(widgetId, widget) {
            for (var u in widgets) {
                if(widgets[u]._id == widgetId) {
                    widgets[u] = widget;
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(widgetId) {
            for (var u in widgets) {
                if(widgets[u]._id == widgetId) {
                    widgets.splice(u,1);
                    return true;
                }
            }
            return false;
        }

        function findAllWidgetsForUser(pageId) {
            var resultSet = [];
            for (var w in pages) {
                if (pages[w].pageId === pageId) {
                    console.log(pageId)
                    // websites[w].created = new Date();
                    // websites[w].updated = new Date();
                    resultSet.push(widgets[w]);
                }
            }
            console.log(resultSet);
            return resultSet;
        }
    }
})();