/**
 * Created by z.gulchak on 9/17/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('VideoDetailCtrl', VideoDetailCtrl);

    VideoDetailCtrl.$inject = ['$stateParams'];

    function VideoDetailCtrl($stateParams) {
        var vm = this;

        jwplayer.key = "";
        // Create a jwplayer instance
        jwplayer('my_video').setup({
            flashplayer: '/bower_components/jwplayer/jwplayer.flash.swf',
            html5player: '/bower_components/jwplayer/jwplayer.html5.js',
            file: 'https://www.youtube.com/watch?v=' + $stateParams.videoId
        });
    }
}());
