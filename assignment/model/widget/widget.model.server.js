/**
 * Created by Ranran on 2017/6/9.
 */
var mongoose = require('mongoose');
module.exports = function () {
    var widgetSchema = require("./widget.schema.server");
    var widgetModel = mongoose.model("widgetModel", widgetSchema);
    var pageModel = require('../page/page.model.server');

    widgetModel.createWidget = createWidget;
    widgetModel.findWidgetsByPageId = findWidgetsByPageId;
    widgetModel.findWidgetById = findWidgetById;
    widgetModel.updateWidget = updateWidget;
    widgetModel.deleteWidget = deleteWidget;
    widgetModel.reorderWidget = reorderWidget;
    widgetModel.findWidgetsByIds = findWidgetsByIds;

    module.exports = widgetModel;

    return {
        createWidget: createWidget,
        findWidgetsByPageId: findWidgetsByPageId,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        findWidgetsByIds: findWidgetsByIds
    };

    function createWidget(widget) {
        return widgetModel.create(widget)
            .then(function (widget) {
                var pageId = widget._page;
                var widgetId = widget._id;
                pageModel.addWidgetToArray(pageId, widgetId);
                return widget;
            })
    }

    function findWidgetsByPageId(pageId) {
        return pageModel.findPageById(pageId)
            .then(function (page) {
                return page._widgets;
            })
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
        return widgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                var pageId = widget._page;
                return widgetModel.remove({_id: widgetId})
                    .then(function () {
                        return pageModel.deleteWidgetFromArray(pageId, widgetId);
                    })
            })
    }


    function reorderWidget(pageId, start, end) {
        return pageModel
            .findPageById(pageId)
            .then(function (page) {
                var widgets = page._widgets;
                widgets.splice(end, 0, widgets.splice(start, 1)[0]);
                page._widgets = widgets;
                return pageModel.updatePage(pageId, page);
            })
    }

    function findWidgetsByIds(widgetIds) {
        return widgetModel.find(
            {_id: {$in: widgetIds}}
        )
    }
};