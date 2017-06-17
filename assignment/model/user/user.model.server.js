/**
 * Created by Ranran on 2017/6/8.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server');

    var userModel = mongoose.model('users', userSchema);

    userModel.createUser = createUser;
    userModel.findUserById = findUserById;
    userModel.findUserByCredentials = findUserByCredentials;
    userModel.deleteUser = deleteUser;
    userModel.updateUser = updateUser;
    userModel.findUserByFacebookId = findUserByFacebookId;
    // Helper Function
    userModel.addWebsiteToArray = addWebsiteToArray;
    userModel.deleteWebsiteFromArray = deleteWebsiteFromArray;

    module.exports = userModel;

    return {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByFacebookId: findUserByFacebookId,
        // Helper Function
        addWebsiteToArray: addWebsiteToArray,
        deleteWebsiteFromArray: deleteWebsiteFromArray
    };


    function createUser(user) {
        return userModel.create(user);
    }

    function findUserByCredentials(username, password) {
        return userModel.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return userModel.findOne({username: username});
    }

    function findUserById(userId) {
        return userModel.findById(userId);
    }

    function updateUser(id, newUser) {
        return userModel.update(
            {_id: id},
            {
                $set: {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email
                }

            });
    }

    function deleteUser(userId) {
        return userModel.remove({_id: userId})
    }

    function findUserByFacebookId(facebookId) {
        return userModel.findOne({'facebook.id': facebookId});
    }


///////////// Helper function/////////////////

    function addWebsiteToArray(userId, websiteId) {
        return userModel
            .findUserById(userId)
            .then(function (user) {
                user._websites.push(websiteId);
                return user.save();
            });
    }

    function deleteWebsiteFromArray(userId, websiteId) {
        return userModel
            .findUserById(userId)
            .then(function (user) {
                var index = user._websites.indexOf(websiteId);
                user._websites.splice(index, 1);
                return user.save();
            })
    }
};