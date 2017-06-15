(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController(currentUser, $location,$rootScope, $routeParams, userService) {
        var model = this;
        model.user = currentUser;
        var userId = currentUser._id;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init(){
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

        function logout() {
            userService
                .logout()
                .then(
                    function(response) {
                        $location.url("/login");
                    })
        }
    }
})();
