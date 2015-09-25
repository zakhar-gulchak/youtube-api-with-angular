/**
 * Created by z.gulchak on 9/17/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('UploadCtrl', UploadCtrl);

    UploadCtrl.$inject = ['VideoUpload'];

    function UploadCtrl(VideoUpload) {
        var vm = this;
        vm.video = {};

        vm.upload = function () {
            VideoUpload(vm.video);
        };
    }
}());
