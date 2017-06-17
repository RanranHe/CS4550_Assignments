(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {
        var model = this;

        model.checkUsername = true;
        model.checkPassword1 = true;
        model.checkPassword2 = true;
        model.checkPasswordMatch = true;


        // event handlers
        model.register = function (username, password, password2) {
            var usernameCheck = username === null || username === '' || username === undefined;
            var password1Check = password === null || password === '' || password === undefined;
            var password2Check = password2 === null || password2 === '' || password2 === undefined;

            model.checkUsername = true;
            model.checkPassword1 = true;
            model.checkPassword2 = true;
            model.checkPasswordMatch = true;

            if (usernameCheck && password1Check && password2Check) {
                model.checkUsername = false;
                model.checkPassword1 = false;
                model.checkPassword2 = false;
                return;
            }
            if (usernameCheck && password1Check) {
                model.checkUsername = false;
                model.checkPassword1 = false;
                return;
            }
            if (usernameCheck && password1Check && password2Check) {
                model.checkUsername = false;
                model.checkPassword2 = false;
                return;
            }
            if (password1Check && password2Check) {
                model.checkPassword1 = false;
                model.checkPassword2 = false;
                return;
            }
            if (usernameCheck) {
                model.checkUsername = false;
                return;
            }
            if (password1Check) {
                model.checkPassword1 = false;
                return;
            }
            if (password2Check) {
                model.checkPassword2 = false;
                return;
            }
            if (password !== password2) {
                model.checkPasswordMatch = false;
                return;
            }

            var found = null;//userService.findUserByUsername(username);

            userService
                .findUserByUsername(username)
                .then (function (found) {
                    if(found !== null) {
                        model.error = "Username is not available";
                    } else {
                        var user = {
                            username: username,
                            password: password
                        };
                        userService
                            .register(user)
                            .then(function (user) {
                                $location.url('/profile');
                            });
                    }
                })
        }
    }
})();