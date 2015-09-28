/**
 * Created by z.gulchak on 9/17/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('VideoDetailCtrl', VideoDetailCtrl);

    VideoDetailCtrl.$inject = ['$stateParams', 'VideoResource', '$timeout'];

    function VideoDetailCtrl($stateParams, VideoResource, $timeout) {
        var vm = this;

        $timeout(function () {
            VideoResource.getVideosMetadata.query({id: $stateParams.videoId}, setMetadata);
        }, 1000);

        function setMetadata (data) { // todo move to service
            var item = data.items[0].snippet;
            vm.title = item.title;
            vm.description = item.description;
        }

        jwplayer.key = "";
        // Create a jwplayer instance
        jwplayer('my_video').setup({
            flashplayer: '/bower_components/jwplayer/jwplayer.flash.swf',
            html5player: '/bower_components/jwplayer/jwplayer.html5.js',
            file: 'https://www.youtube.com/watch?v=' + $stateParams.videoId
        });
    }
}());
