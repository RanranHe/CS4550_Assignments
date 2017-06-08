(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        // event handlers
        model.register = function (username, password, password2) {
            if (username === null || username === '[]' || typeof username === 'undefined') {
                model.error = 'Invalid Empty Username!';
                return;
            }

            if (password === null || password === '' || typeof password === 'undefined'
            || password2 === null || password2 === '' || typeof password2 === 'undefined') {
                model.error = 'Password cannot be empty!';
                return;
            }

            if (password !== password2) {
                model.error = "Passwords not match!";
                return;
            }
            userService
                .findUserByUsername(username)
                .then(checkUser);


            function checkUser(user) {
                if (user.username===null) {
                    model.error = "Username not available."
                } else {
                    var newUser = {
                        username: username,
                        password: password
                    };
                    console.log("newUser: " + newUser.username + "  " + newUser.password);
                    userService
                        .createUser(newUser)
                        .then(function (res) {
                           $location.url("/user/" + res.data._id);
                        });
                }
            }
        }
    }
})();