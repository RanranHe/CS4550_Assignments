(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController', NewWebsiteController);

    function NewWebsiteController($routeParams, $location, websiteService) {
        var model = this;

        model.userId = $routeParams['uid'];
        model.createWebsite  = createWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }
        init();

        function createWebsite(name, description) {
            var newWebsite = {
                _id: (new Date()).getTime(),
                name: name,
                developerId: model.uid,
                description: description
            };
            console.log(newWebsite);
            websiteService.createWebsite(model.userId, newWebsite);
            $location.url('/user/' + model.userId + '/website/');
        }
    }
})();