/**
 * Created by z.gulchak on 9/17/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('VideoEditCtrl', VideoEditCtrl);

    VideoEditCtrl.$inject = ['$stateParams', 'VideoResource', 'VideoUpload', '$state'];

    function VideoEditCtrl($stateParams, VideoResource, VideoUpload, $state) {
        var vm = this;
        vm.video = {id: $stateParams.videoId, tags: []};

        vm.update = function (isValid) {
            if (isValid) {
                VideoUpload.updateMetadata(vm.video)
                    .then(function () {
                        toastr.success('Metadata updated.');
                    });
            } else {
                toastr.error("Invalid form values.");
            }
        };

        vm.cancel = function () {
            $state.go('youtubeApp.myvideos');
        };

        VideoResource.getVideosMetadata.query(
            {id: $stateParams.videoId}, function (response) {
                vm.video = VideoResource.setMetadata(response);
            });
    }
}());
