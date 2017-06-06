/**
 * Created by Ranran on 2017/6/5.
 */
(function () {
    angular
        .module('WebAppMaker')
        .directive('wdDraggable', wdDraggable);

    function wdDraggable(WidgetService) {
        var initial = -1;
        var final = -1;

        function linkFunction(scope, element) {
            $(element).sortable(
                {
                    axis: "y",
                    scroll: false,
                    start: function (event, ui) {
                        initial = ui.item.index();
                    },
                    stop: function (event, ui) {
                        final = ui.item.index();
                        WidgetService
                            .sortWidget(initial, final);
                    }
                }
            )
        }

        return {
            link: linkFunction
        }
    }
})();

