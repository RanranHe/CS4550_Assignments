/**
 * Created by Ranran on 2017/5/27.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("EditPageController", EditPageController)
        .controller("NewPageController", NewPageController);

    function EditPageController($routeParams, $location, PageService) {
        var model = this;
        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.pages = PageService.findAllPagesForUser(model.websiteId);
            model.page = PageService.findPageById(model.pageId);
        }
        init();

        function updatePage() {
            var result = PageService.updatePage(model.pageId, model.page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/');
        }

        function deletePage() {
            PageService.deletePage(model.pageId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/');
        }
    }

    function PageListController($routeParams, PageService) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        function init() {
            model.pages = PageService.findAllPagesForUser(model.websiteId);
        }
        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var model = this;
        model.userId = $routeParams.uid;
        model.websiteId = $routeParams['wid'];
        model.createPage  = createPage;
        function init() {
            model.pages = PageService.findAllPagesForUser(model.websiteId);
            model.page = PageService.findPagesByWebsiteId(model.websiteId);
        }
        init();

        function createPage(name, title) {
            var newPage = {
                _id: (new Date()).getTime(),
                name: name,
                websiteId: model.websiteId,
                title: title
            };
            PageService.createPage(model.userId, newPage);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/');
        }
    }
})();