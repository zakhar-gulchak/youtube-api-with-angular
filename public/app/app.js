(function () {
    'use strict';

    var app = angular.module('youtube-app',
        ['common.services',
            'common.directives',
            'ui.router',
            'angular-google-gapi',
            'angular-loading-bar']);

    app.config(['$sceDelegateProvider', '$stateProvider', '$urlRouterProvider',
            function ($sceDelegateProvider, $stateProvider, $urlRouterProvider) {

                $sceDelegateProvider.resourceUrlWhitelist([
                    'self',
                    'https://www.youtube.com/**',
                    'https://youtu.be/**',
                    'https://accounts.google.com/**'
                ]);

                $urlRouterProvider.otherwise('/home');

                $stateProvider
                    .state('welcome', {
                        url: '/welcome',
                        templateUrl: 'app/infoPages/welcomeView.html',
                        controller: 'WelcomeCtrl as vm',
                        resolve: {
                            auth: function (AuthService, $state, $rootScope) {
                                return AuthService.checkAuth()
                                    .then(function () {
                                            AuthService
                                                .setAuthToken();
                                            $rootScope.$broadcast('isLoggedIn', true);
                                            $state.go('youtubeApp.home');
                                        }, function () {});
                            }
                        }
                    })
                    .state('youtubeApp', {
                        abstract: true,
                        template: '<ui-view/>',
                        resolve: {
                            auth: function (AuthService, $state, $rootScope) {
                                return AuthService.checkAuth()
                                    .then(function () {
                                            AuthService
                                                .setAuthToken();
                                            $rootScope.$broadcast('isLoggedIn', true);
                                        },
                                        function () {
                                            $state.go('welcome');
                                        });
                            }
                        }
                    })
                    .state('youtubeApp.home', {
                        url: '/home',
                        templateUrl: 'app/infoPages/homeView.html',
                        controller: 'HomeCtrl as vm'
                    })
                    .state('youtubeApp.videoDetail', {
                        url: '/video/:videoId',
                        templateUrl: 'app/videoItem/videoDetailView.html',
                        controller: 'VideoDetailCtrl as vm'
                    })
                    .state('youtubeApp.editVideo', {
                        url: '/video/edit/:videoId',
                        templateUrl: 'app/videoItem/videoEditView.html',
                        controller: 'VideoEditCtrl as vm'
                    })
                    .state('youtubeApp.upload', {
                        url: '/upload',
                        templateUrl: 'app/videoItem/uploadView.html',
                        controller: 'UploadCtrl as vm'
                    })
                    .state('youtubeApp.myvideos', {
                        url: '/myvideos',
                        templateUrl: 'app/videoLists/videoListView.html',
                        controller: 'MyVideosCtrl as vm'
                    })
                    .state('youtubeApp.watchLaterList', {
                        url: '/watch-later',
                        templateUrl: 'app/videoLists/videoListView.html',
                        controller: 'WatchLaterListCtrl as vm'
                    });
            }])
        .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
        }]);
}());
