/**
 * Created by z.gulchak on 9/15/2015.
 */
(function () {
    "use strict";

    angular
        .module("youtube-app")
        .controller("WelcomeCtrl",
            ["gapiService", WelcomeCtrl]);


    function WelcomeCtrl (gapiService) {
        var vm = this;

        vm.search = function(text) {
            var str = gapiService.search(text);
            $('#search-container').html('<pre>' + str + '</pre>');
        }
    }
}());
