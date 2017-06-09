/**
 * Created by Ranran on 2017/6/9.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server');

    var websiteModel = mongoose.model('websites', websiteSchema);

    websiteModel.createUser = createUser;
    websiteModel.findUserById = findUserById;
    websiteModel.findUserByCredentials = findUserByCredentials;
    websiteModel.deleteUser = deleteUser;
    websiteModel.updateUser = updateUser;

    module.exports = websiteModel;

    return {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser
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
            {$set :
                {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName
                }

            });
    }

    function deleteUser(userId) {
        return userModel.remove({_id: userId});
    }
};