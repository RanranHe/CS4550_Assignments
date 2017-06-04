(function () {
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController);

    function LoginController($location, userService) {

        var model = this;

        model.login = function (username, password) {
            userService
                .findUserByCredentials(username, password)
                .then(login, handleError);

            function handleError() {
                model.message = "Username " + username + " not found. Please try again.";
            }

            function login(found) {
                if (found) {
                    $location.url('/user/' + found._id);
                } else {
                    model.message = "Username " + username + " not found. Please try again.";
                }
            }
        }
    }
})();
