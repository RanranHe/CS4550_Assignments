/**
 * Created by Ranran on 2017/6/5.
 */
(function () {
    angular
        .module('wbdvDirectives', ['ngRoute'])
        .directive('wdDraggable', wdDraggable);

    function wdDraggable() {
        return {
            link: linkFunction,
            controller: directiveController
        };

        function linkFunction(scope, element, attributes, directiveController) {
            $(element).sortable({
                start: function (event, ui) {
                    ui.item.startPosition = ui.item.index();
                },
                update: function (event, ui) {
                    var start = ui.item.startPosition;
                    var end = ui.item.index();
                    directiveController.reorderWidget(start, end);
                },
                axis: 'y',
                cursor: "move"
            });
        }
    }

    function directiveController(WidgetService, $http, $routeParams) {
        var model = this;
        model.reorderWidget = reorderWidget;

        function reorderWidget(start, end) {
            var pageId = $routeParams['pid'];
            WidgetService.reorderWidget(pageId, start, end)
        }
    }
})();

