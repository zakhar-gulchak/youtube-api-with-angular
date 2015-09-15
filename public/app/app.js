(function () {
    "use strict";
    var app = angular.module("youtube-app", [
        "common.services",
        "ui.router"
    ]);

    app.run(function (gapiService) {

    });

    app.config(["$stateProvider",
        "$urlRouterProvider",
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: "app/welcomeView.html",
                    controller: 'WelcomeCtrl as vm'
                })
                .state('home.search', {
                    url: 'search/:searchText',
                    //templateUrl: 'app/search/searchView.html',
                    controller: 'SearchCtrl as vm'
                });
        }]);
}());
