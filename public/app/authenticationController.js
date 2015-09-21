/**
 * Created by z.gulchak on 9/17/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('AuthenticationCtrl', AuthenticationCtrl);

    AuthenticationCtrl.$inject = ['GAuth', 'GData', '$http'];

    function AuthenticationCtrl(GAuth, GData, $http) {
        var vm = this;
        vm.userInfo = null;

        var CLIENT_ID = '718637650333-fd4d1dd8hj25o9dke4bj6rve41k1n00n.apps.googleusercontent.com';
        var AUTH_SCOPE = 'https://www.googleapis.com/auth/youtube';
        var REVOKE_TOKEN_URL = 'https://accounts.google.com/o/oauth2/revoke?token=';

        GAuth.setClient(CLIENT_ID);
        GAuth.setScope(AUTH_SCOPE);

        GAuth.checkAuth().then(function () {
            loadUserInfo();
            var token = GAuth.getToken().$$state.value.access_token;
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        });

        vm.login = function () {
            GAuth.login().then(function () {
                loadUserInfo();
            });
        };

        vm.logout = function () {
            var token = GAuth.getToken().$$state.value.access_token;
            GAuth.logout();
            vm.userInfo = null;
            $http.jsonp(REVOKE_TOKEN_URL + token);
        };

        function loadUserInfo() {
            if (!vm.userInfo) {
                vm.userInfo = GData.getUser();
            }
        }
    }
}());
