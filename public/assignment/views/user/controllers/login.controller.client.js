(function () {
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController);

    function LoginController($location, userService) {

        var model = this;

        model.login = function (username, password) {
            var found = userService.findUserByCredentials(username, password)
            if (found !== null) {
                $location.url('/user/' + found._id);
                //model.message = "Welcome " + username;
            } else {
                model.message = "Username " + username + " not found. Please try again.";
            }
        };
    }
})();
