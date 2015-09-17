/**
 * Created by z.gulchak on 9/17/2015.
 */
(function () {
    'use strict';

    angular
        .module('youtube-app')
        .controller('AuthenticationCtrl', AuthenticationCtrl);

    AuthenticationCtrl.$inject = ['GAuth', 'GData'];

    function AuthenticationCtrl(GAuth, GData) {
        var vm = this;
        vm.userInfo = {};

        var CLIENT_ID = '718637650333-fd4d1dd8hj25o9dke4bj6rve41k1n00n.apps.googleusercontent.com';
        var AUTH_SCOPE = 'https://www.googleapis.com/auth/youtube';

        GAuth.setClient(CLIENT_ID);
        GAuth.setScope(AUTH_SCOPE);

        GAuth.checkAuth().then(function(){
            loadUserInfo();
        });

        vm.login = function () {
            GAuth.login();
        };

        vm.logOut = function () {
            GAuth.logOut();
        };

        function loadUserInfo() {
            if (!vm.userInfo.fullName) {
                var userData = GData.getUser();
                vm.userInfo.fullName = userData.name;
                vm.userInfo.picture = userData.picture;
            }
        }
    }
}());
