/**
 * Created by z.gulchak on 9/17/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('UploadCtrl', UploadCtrl);

    UploadCtrl.$inject = ['VideoUpload', '$state'];

    function UploadCtrl(VideoUpload, $state) {
        var vm = this;
        vm.video = {tags: []};

        vm.upload = function (isValid) {
            if (isValid) {
                if (!vm.video.file) {
                    toastr.error("Please choose video file.");
                } else {
                    VideoUpload.uploadVideo(vm.video)
                        .then(function () {
                                toastr.success("Uploading finished successful");
                                $state.go('youtubeApp.myvideos');
                            }, function (error) {
                                toastr.error(error.message);
                            }
                        );
                }
            } else {
                toastr.error("Invalid form values.");
            }
        };

        vm.cancel = function () {
            $state.go('youtubeApp.myvideos');
        };
    }
}());
