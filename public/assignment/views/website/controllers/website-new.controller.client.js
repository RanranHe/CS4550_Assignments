(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController', NewWebsiteController);

    function NewWebsiteController($routeParams, $location, websiteService) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }

        init();

        function createWebsite(name, description) {
            var newWebsite = {
                _id: (new Date()).getTime() + "",
                name: name,
                developerId: model.userId,
                description: description
            };

            websiteService
                .createWebsite(model.userId, newWebsite)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/');
                });
        }
    }
})();