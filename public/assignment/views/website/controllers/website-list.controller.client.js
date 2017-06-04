(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);

    function WebsiteListController($routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['uid'];

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }

        init();
    }
})();