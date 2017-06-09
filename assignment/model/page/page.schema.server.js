/**
 * Created by Ranran on 2017/6/9.
 */
var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    _website:{type: mongoose.Schema.Types.ObjectId, ref: 'Website'},
    name: String,
    title: String,
    description: String,
    _widgets: {type: mongoose.Schema.Types.ObjectId, ref: 'Widget'},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "webdev_assignment.pages"});

module.exports = pageSchema;