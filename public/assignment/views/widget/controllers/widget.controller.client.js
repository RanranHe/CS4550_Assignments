/**
 * Created by Ranran on 2017/5/28.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("WidgetChooserController", WidgetChooserController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var model = this;
        model.getHtml = getHtml;
        model.getUrl = getUrl;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        function init() {
            WidgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }

        init();

        function getHtml(widget) {
            var html = $sce.trustAsHtml(widget.text);
            return html;
        }

        function getUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

    }

    function WidgetChooserController($location, $routeParams, WidgetService) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];
        model.createWidget = createWidget;

        function init() {
            WidgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }

        init();

        function createWidget(widgetType) {
            var newWidget = {
                _id: (new Date()).getTime() + "",
                name: "",
                widgetType: widgetType,
                pageId: model.pageId
            };

            WidgetService
                .createWidget(model.pageId, newWidget);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + newWidget._id);
            return newWidget;
        }
    }

    function EditWidgetController($location, $routeParams, WidgetService) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;
        model.getTemplate = getTemplate;

        function init() {
            WidgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });

            WidgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                });
        }

        init();

        function getTemplate(widgetType) {
            if (widgetType === "HEADING") {
                var template = 'views/widget/templates/widget-heading.html';
            }
            if (widgetType === "IMAGE") {
                var template = 'views/widget/templates/widget-image.html';
            }
            if (widgetType === "YOUTUBE") {
                var template = 'views/widget/templates/widget-youtube.html';
            }
            return template;
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(model.widgetId)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + /widget/);
                });
        }

        function updateWidget() {
            WidgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + /widget/);
                });
        }
    }
})();