/**
 * Created by z.gulchak on 9/17/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('AuthenticationCtrl', AuthenticationCtrl);

    AuthenticationCtrl.$inject = ['AuthService', '$state', '$scope'];

    function AuthenticationCtrl(AuthService, $state, $scope) {
        var vm = this;
        vm.userInfo = null;
        vm.isLoggedIn = null;

        vm.login = function () {
            AuthService.login()
                .then(function () {
                    loadUserInfo();
                    $state.go('youtubeApp.home');
                });
        };

        vm.logout = function () {
            vm.userInfo = null;
            AuthService.logout()
                .error(function () {
                    $state.go('welcome');
                });
        };

        vm.isActive = function (stateName) {
            return $state.current.name === stateName;
        };

        $scope.$on('isLoggedIn', function (event, message) {
            if (message) {
                loadUserInfo();
            }
            vm.isLoggedIn = message;
        });

        //////////

        function loadUserInfo() {
            if (!vm.userInfo) {
                vm.userInfo = AuthService.getUser();
            }
        }
    }
}());
