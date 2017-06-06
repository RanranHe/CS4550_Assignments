/**
 * Created by Ranran on 2017/6/6.
 */
(function () {
    angular
        .module('WebAppMaker')
        .service('FlickrService', FlickrService);

    function FlickrService($http) {
        this.searchPhotos = searchPhotos;
        var key = "8b0f9c7d57151c1394fe61dd88b4f3b1";
        var secret = "94b29462a07da517";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();