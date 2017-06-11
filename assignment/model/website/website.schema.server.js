/**
 * Created by Ranran on 2017/6/9.
 */
var mongoose = require("mongoose");

var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel'},
    name: String,
    description: String,
    _pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'pageModel'}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "webdev_assignment.websites"});
module.exports = websiteSchema;