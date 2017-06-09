/**
 * Created by Ranran on 2017/6/8.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    websites: {type: mongoose.Schema.ObjectId, ref: 'websiteModel'},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "webdev_assignment.users"});

module.exports = userSchema;