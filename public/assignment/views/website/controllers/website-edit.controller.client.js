(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController', EditWebsiteController);

    function EditWebsiteController($routeParams, $location, websiteService) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
            websiteService
                .findWebsiteById(model.websiteId)
                .then(function (website) {
                    model.website = website;
                });
        }

        init();

        function updateWebsite() {
            websiteService
                .updateWebsite(model.websiteId, model.website)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website');
                });
        }

        function deleteWebsite() {
            websiteService
                .deleteWebsite(model.websiteId)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website');
                });
        }
    }
})();