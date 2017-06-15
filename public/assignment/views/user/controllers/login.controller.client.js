(function () {
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController);

    function LoginController($location, userService) {
        var model = this;

        model.login = function (username, password) {

            userService
                .login(username, password)
                .then(login, handleError);

            function handleError(error) {
                model.message = "Username " + username + " not found, please try again";
            }

            function login(found) {
                if(found !== null) {
                    $location.url('/profile');
                } else {
                    model.message = "Username " + username + " not found, please try again";
                }
            }
        };
    }
})();
