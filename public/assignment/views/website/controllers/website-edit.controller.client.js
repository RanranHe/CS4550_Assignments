(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController', EditWebsiteController);

    function EditWebsiteController($routeParams, $location, websiteService) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.updateWebsite = updateWebsite;
        model.deleteWebsite  = deleteWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        function updateWebsite() {
            var result = websiteService.updateWebsite(model.websiteId, model.website);
            $location.url('/user/' + model.userId + '/website/');

        }

        function deleteWebsite() {
            websiteService.deleteWebsite(model.websiteId);
            $location.url('/user/' + model.userId + '/website/');
        }
    }
})();