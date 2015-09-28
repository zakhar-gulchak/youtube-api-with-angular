/**
 * Created by z.gulchak on 9/17/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('VideoEditCtrl', VideoEditCtrl);

    VideoEditCtrl.$inject = ['$stateParams', 'VideoResource', '$timeout', 'VideoUpload'];

    function VideoEditCtrl($stateParams, VideoResource, $timeout, VideoUpload) {
        var vm = this;
        vm.video = {id: $stateParams.videoId};

        $timeout(function () {
            VideoResource.getVideosMetadata.query({id: $stateParams.videoId}, setMetadata);
        }, 1000);

        function setMetadata(data) { // todo move to service
            var item = data.items[0].snippet;
            vm.video.title = item.title;
            vm.video.description = item.description;
            vm.video.status = data.items[0].status.privacyStatus;
        }

        vm.update = function () {
            VideoUpload.updateMetadata(vm.video);
        };
    }
}());
