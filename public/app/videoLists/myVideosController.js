/**
 * Created by z.gulchak on 9/28/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('MyVideosCtrl', MyVideosCtrl);

    MyVideosCtrl.$inject = ['VideoResource', '$state'];

    function MyVideosCtrl(VideoResource, $state) {
        var vm = this;
        vm.title = 'My videos';
        vm.videos = null;
        vm.inEditMode = true;

        VideoResource.getListFromChannel.query(getVideosFromPlaylist);

        vm.deleteVideo = function ($event, videoId) {
            $event.preventDefault();
            $event.stopPropagation();

            VideoResource.deleteVideo.query({id: videoId}, updateHTML);
            toastr.info('Video was deleted.');
        };

        vm.goEdit = function ($event, videoId) {
            $event.preventDefault();
            $event.stopPropagation();

            $state.go('youtubeApp.editVideo', {videoId: videoId});
        };

        //////////

        function updateHTML() {
            vm.videos = VideoResource.getListFromChannel.query(getVideosFromPlaylist);
        }

        function getVideosFromPlaylist(response) {
            var playlistId = response.items[0].contentDetails.relatedPlaylists.uploads;
            VideoResource.getVideosFromPlaylist.query(
                {playlistId: playlistId}, function (response) {
                    vm.videos = VideoResource.handleVideoList(response);
                });
        }
    }
}());
