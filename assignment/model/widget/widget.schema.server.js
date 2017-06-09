/**
 * Created by Ranran on 2017/6/9.
 */
var mongoose = require('mongoose');
var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
    widgetType: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url:String,
    width:String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deleteable: Boolean,
    formatted: Boolean,
    order: Number,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "webdev_assignment.widgets"});

module.exports = widgetSchema;