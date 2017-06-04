(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {
        var model = this;
        var userId = $routeParams['uid'];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            userService
                .findUserById(userId)
                .then(function (res) {
                    model.user = res.data;
                });
        }
        init();

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
