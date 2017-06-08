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

    module.exports = userModel;

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
        return userModel.find({username: username});
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