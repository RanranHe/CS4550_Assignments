/**
 * Created by Ranran on 2017/5/28.
 */
(function () {
    // $(document).ready(function () {
    //     $('select').material_select();
    // });
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
            model.widgets = WidgetService.findWidgetsByPageId(model.pageId);
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
            model.widgets = WidgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function createWidget(widgetType) {
            var newWidget = {
                _id: (new Date()).getTime(),
                name: "",
                widgetType: widgetType,
                pageId: model.pageId
            };
            WidgetService.createWidget(model.pageId, newWidget);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + newWidget._id);
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

        function init() {
            model.widget = WidgetService.findWidgetById(model.widgetId);
            model.widgets = WidgetService.findWidgetsByPageId(model.pageId);
            console.log(model.widget)
        }
        init();

        function deleteWidget() {
            WidgetService.deleteWidget(model.widgetId);
        }

        // function updateWidget(widgetId, widget)
        function updateWidget() {
            var result = WidgetService.updateWidget(model.widgetId, model.widget);
            if (result === true) {
                Materialize.toast("Success", 1000);
            } else {
                Materialize.toast("Widget Not Found", 1000);
            }
            console.log(model.widgets)
        }
    }
})();