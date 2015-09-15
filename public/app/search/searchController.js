/**
 * Created by z.gulchak on 9/15/2015.
 */
(function () {
    "use strict";

    angular
        .module("youtube-app")
        .controller("SearchCtrl",
                    [SearchCtrl]);

    function SearchCtrl() {
        var vm = this;


        vm.search = function(text) {
            alert(text);
        }
    }
}());
