/**
 * Created by z.gulchak on 10/1/2015.
 */
(function () {
    'use strict';

    angular
        .module('common.services')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$http', 'GAuth', 'GData'];

    function AuthService($http, GAuth, GData) {
        var CLIENT_ID = '718637650333-fd4d1dd8hj25o9dke4bj6rve41k1n00n.apps.googleusercontent.com';
        var AUTH_SCOPE = 'https://www.googleapis.com/auth/youtube';
        var REVOKE_TOKEN_URL = 'https://accounts.google.com/o/oauth2/revoke?token=';

        GAuth.setClient(CLIENT_ID);
        GAuth.setScope(AUTH_SCOPE);

        function login() {
            return GAuth.login().then(setAuthToken);
        }

        function getUser() {
            return GData.getUser();
        }

        function isLoggedIn() {
            return GData.isLogin();
        }

        function checkAuth() {
            return GAuth.checkAuth();
        }

        function logout() {
            var token = GAuth.getToken().$$state.value.access_token;
            GData.isLogin(false);

            return $http.jsonp(
                REVOKE_TOKEN_URL + token, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
        }

        function setAuthToken() {
            var token = GAuth.getToken().$$state.value.access_token;
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }

        return {
            login: login,
            getUser: getUser,
            isLoggedIn: isLoggedIn,
            checkAuth: checkAuth,
            logout: logout,
            setAuthToken: setAuthToken
        };
    }
}());
