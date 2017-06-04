(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {
        return {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function createUser(user) {
            var url = "/api/user";
            return $http
                .post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, newUser) {
            var url = "/api/user/"+ userId;
            var data =  {
                id: userId,
                newUser: newUser
            };
            return $http.put(url, data);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http
                .delete(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }
    }
})();
