(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);

    function WebsiteListController($routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['uid'];

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }
        init();
    }
})();