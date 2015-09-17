/**
 * Created by z.gulchak on 9/15/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['VideoResource'];

    function HomeCtrl(VideoResource) {
        var vm = this;
        vm.videos = [];

        vm.search = function (searchText) {
            VideoResource.query({q: searchText}, onRespond);
        };

        function onRespond(data) {
            vm.videos = filterVideosFromThread(data.items);
            debugger;
        }

        function filterVideosFromThread(items) {
            var arr = [];
            items.forEach(function (item) {
                if (item.id.kind === 'youtube#video') {
                    arr.push(item);
                }
            });

            return arr;
        }
    }
}());
