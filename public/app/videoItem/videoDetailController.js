/**
 * Created by z.gulchak on 9/17/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('VideoDetailCtrl', VideoDetailCtrl);

    VideoDetailCtrl.$inject = ['$stateParams', 'VideoResource'];

    function VideoDetailCtrl($stateParams, VideoResource) {
        var vm = this;
        vm.video = VideoResource.getVideosMetadata.query(
            {id: $stateParams.videoId}, function (data) {
                vm.video = VideoResource.setMetadata(data);
            });
    }
}());
