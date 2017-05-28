(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {
        var model = this;
        var userId = $routeParams['uid'];
        model.updateUser = updateUser;

        function init() {
            model.user = userService.findUserById(userId);
        }
        init();

        function updateUser() {
            var result = userService.updateUser(model.user._id, model.user);
            $location.url('/user/' + model.user._id);
        }
    }
})();
