/**
 * Created by Ranran on 2017/5/28.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($routeParams, $http) {
        return {
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            createWidget: createWidget,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sortWidget: sortWidget
        };

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            var data = {
                pageId: pageId,
                widget: widget
            };

            return $http
                .post(url, data)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            var data = {
                widgetId: widgetId,
                widget: widget
            };
            return $http
                .put(url, data)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function sortWidget (initial, final) {
            var url = "/page/"+ $routeParams['pid'] + "/widget?initial=" + initial + "&final=" + final;
            return $http.put(url);
        }
    }
})();