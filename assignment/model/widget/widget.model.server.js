/**
 * Created by Ranran on 2017/6/9.
 */
var mongoose = require('mongoose');
module.exports = function () {
    var widgetSchema = require("./widget.schema.server");
    var widgetModel = mongoose.model("widgetModel", widgetSchema);

    widgetModel.createWidget = createWidget;
    widgetModel.findWidgetsByPageId = findWidgetsByPageId;
    widgetModel.findWidgetById = findWidgetById;
    widgetModel.updateWidget = updateWidget;
    // widgetModel.deletePage = deletePage;

    module.exports = widgetModel;

    return {
        createWidget: createWidget,
        findWidgetsByPageId: findWidgetsByPageId,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget
    };

    function createWidget(widget) {
        return widgetModel.create(widget);

    }

    function findWidgetsByPageId(pageId) {
        return widgetModel.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return widgetModel.findOne({_id: widgetId});

    }

    function updateWidget(widgetId, widget) {
        return widgetModel.update(
            {_id: widgetId},
            {$set: widget});
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

    function reorderWidget(pageId, start, end) {
        start = parseInt(start);
        end = parseInt(end);
        return Widget
            .find({_page: pageId}, function (err, widgets) {
                widgets.forEach(function (widget) {
                    if (start < end) {
                        if (widget.order > start && widget.order <= end) {
                            widget.order--;
                            widget.save();
                            console.log("1changed from " + (widget.order + 1) + "to --")
                        } else if (widget.order === start) {
                            widget.order = end;
                            widget.save();
                            console.log("2changed from " + (start) + "to" + end)

                        }
                    } else if (start > end) {
                        if (widget.order >= end && widget.order < start) {
                            widget.order++;
                            widget.save();
                            console.log("3changed from " + (widget.order - 1) + "to ++")

                        }
                        else if (widget.order === start) {
                            widget.order = end;
                            widget.save();
                            console.log("4changed from " + (start) + "to" + end)

                        }
                    }
                })
            });
    }

};