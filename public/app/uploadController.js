/**
 * Created by z.gulchak on 9/17/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('UploadCtrl', UploadCtrl);

    UploadCtrl.$inject = ['VideoUpload', '$state', '$timeout'];

    function UploadCtrl(VideoUpload, $state, $timeout) {
        var vm = this;
        vm.video = {};

        vm.upload = function (isValid) {
            if (isValid) {
                VideoUpload.uploadVideo(vm.video);
                $timeout(function () {
                    $state.go('myvideos');
                }, 2000);
            } else {
                toastr.error("Invalid form values.");
            }
        };

        vm.cancel = function () {
            $state.go('myvideos');
        };
    }
}());
