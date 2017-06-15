(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, $routeParams, userService) {
        var model = this;
        model.user = currentUser;
        var userId = currentUser._id;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        // function init() {
        //     userService
        //         .findUserById(userId)
        //         .then(function (res) {
        //             model.user = res.data;
        //         });
        // }
        function init(){
            // renderUser(currentUser);
        }
        init();

        // function renderUser(user) {
        //     model.user = user;
        // }

        function updateUser() {
            userService
                .updateUser(model.user._id, model.user)
                .then(function () {
                    model.error = "Update Successfully."
                });
        }

        function deleteUser() {
            userService
                .deleteUser(model.user._id)
                .then(function () {
                    $location.url("/login/");
                });
        }
    }
})();
