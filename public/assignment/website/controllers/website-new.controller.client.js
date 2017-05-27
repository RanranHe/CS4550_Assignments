(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController', NewWebsiteController);

    function NewWebsiteController($routeParams, websiteService) {
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
            websiteService.createWebsite(model.uid, newWebsite);
            Materialize.toast("Success", 1000);
        }
    }
})();