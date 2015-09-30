/**
 * Created by z.gulchak on 9/28/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('MyVideosCtrl', MyVideosCtrl);

    MyVideosCtrl.$inject = ['VideoResource', '$timeout', '$state'];

    function MyVideosCtrl(VideoResource, $timeout, $state) {
        var vm = this;
        vm.title = 'My video\'s';
        vm.videos = [];
        $timeout(function () {
            VideoResource.getListFromChannel.query({}, getVideosFromPlaylist)
        }, 1000);

        function getVideosFromPlaylist(response) { // todo move to service
            var playlistId = response.items[0].contentDetails.relatedPlaylists.uploads;
            VideoResource.getVideosFromPlaylist.query(
                {playlistId: playlistId}, onRespond);
        }

        function onRespond(data) { // todo move to service
            vm.videos = [];
            data.items.forEach(function (item) {
                vm.videos.push({
                    id: item.snippet.resourceId.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description
                });
            });
        }

        vm.deleteVideo = function (videoId) {
            VideoResource.deleteVideo.query({id: videoId}, updateHTML);
            toastr.info('Video was deleted.');
        };
        vm.goEdit = function (videoId) {
            $state.go('editVideo', {videoId: videoId});
        };

        function updateHTML() { // todo write here code
            VideoResource.getListFromChannel.query({}, getVideosFromPlaylist);
        }
    }
}());
