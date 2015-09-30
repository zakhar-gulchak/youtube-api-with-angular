(function () {
    'use strict';
    var app = angular.module('youtube-app',
                            ['common.services',
                             'common.directives',
                             'ui.router',
                             'angular-google-gapi',
                             'angular-loading-bar']);

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
                .state('editVideo', {
                    url: '/video/edit/:videoId',
                    templateUrl: 'app/videoEditView.html',
                    controller: 'VideoEditCtrl as vm'
                })
                .state('upload', {
                    url: '/upload',
                    templateUrl: 'app/uploadView.html',
                    controller: 'UploadCtrl as vm'
                })
                .state('myvideos', {
                    url: '/myvideos',
                    templateUrl: 'app/myVideosListView.html',
                    controller: 'MyVideosCtrl as vm'
                })
                .state('watchLaterList', {
                    url: '/watch-later',
                    templateUrl: 'app/watchLaterListView.html',
                    controller: 'WatchLaterListCtrl as vm'
                });
        }])
        .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
        }]);
}());
