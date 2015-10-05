/**
 * Created by z.gulchak on 9/28/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('WatchLaterListCtrl', WatchLaterListCtrl);

    WatchLaterListCtrl.$inject = ['VideoResource'];

    function WatchLaterListCtrl(VideoResource) {
        var vm = this;
        vm.title = 'Watch later list';
        vm.videos = null;

        VideoResource.getListFromChannel.query(getVideosFromPlaylist);

        //////////

        function getVideosFromPlaylist(response) {
            var playlistId = response.items[0].contentDetails.relatedPlaylists.watchLater;
            VideoResource.getVideosFromPlaylist.query(
                {playlistId: playlistId}, function (response) {
                    vm.videos = VideoResource.handleVideoList(response);
                });
        }
    }
}());
