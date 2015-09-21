(function () {
    'use strict';
    var app = angular.module('youtube-app', ['common.services', 'ui.router', 'angular-google-gapi']);

    app.config(['$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/homeView.html',
                    controller: 'HomeCtrl as vm'
                })
                .state('videoDetail', {
                    url: '/video/:videoId',
                    templateUrl: 'app/videoDetailView.html',
                    controller: 'VideoDetailCtrl as vm'
                })
                .state('upload', {
                    url: '/upload',
                    templateUrl: 'app/uploadView.html',
                    controller: 'UploadCtrl as vm'
                });
        }]);
}());
