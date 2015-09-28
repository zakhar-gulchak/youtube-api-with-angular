/**
 * Created by z.gulchak on 9/28/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('WatchLaterListCtrl', WatchLaterListCtrl);

    WatchLaterListCtrl.$inject = ['VideoResource', '$timeout'];

    function WatchLaterListCtrl(VideoResource, $timeout) {
        var vm = this;
        vm.title = 'Watch later list';
        vm.videos = [];
        $timeout(function () {
            VideoResource.getListFromChannel.query({}, getVideosFromPlaylist)
        }, 1000);

        function getVideosFromPlaylist(response) { // todo move to service
            var playlistId = response.items[0].contentDetails.relatedPlaylists.watchLater;
            VideoResource.getVideosFromPlaylist.query(
                {playlistId: playlistId}, onRespond);
        }

        function onRespond(data) { // todo move to service
            data.items.forEach(function (item) {
                vm.videos.push({
                    id: item.snippet.resourceId.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description
                });
            });
        }
    }
}());
