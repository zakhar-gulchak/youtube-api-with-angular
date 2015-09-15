/**
 * Created by z.gulchak on 9/15/2015.
 */
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("gapiService", [
            "$window",
            gapiService]);

    function gapiService($window) {
        var internals = {
            clientId: '718637650333-fd4d1dd8hj25o9dke4bj6rve41k1n00n.apps.googleusercontent.com',
            //apiKey: 'V4pAvT7D8MRkbaEWnxZxkBoY',
            scopes: 'https://www.googleapis.com/auth/youtube',

            triedOnce: false,

            token: null,

            setApiKey: function () {
                // Step 2: Reference the API key
                gapi.client.setApiKey(internals.apiKey);
                $window.setTimeout(internals.checkAuth, 1);
            },

            checkAuth: function () {
                gapi.auth.authorize(
                    {
                        client_id: internals.clientId,
                        scope: internals.scopes,
                        immediate: true
                    },
                    internals.handleAuthResult);
            },

            handleAuthResult: function (authResult) {
                internals.triedOnce = true;
                if (authResult && !authResult.error) {
                    internals.token = gapi.auth.getToken();
                    //$state.go(authorizedState);
                    console.log('Authorized');
                    internals.loadAPIClientInterfaces();
                } else {
                    internals.token = null;
                    //$state.go(unauthorizedState);
                    console.log('Unauthorized');
                }
            },
            loadApiClientInterfaces: function() {
                gapi.client.load('youtube', 'v3', function() {
                    internals.handleAPILoaded();
                });
            },
            handleAPILoaded: function () {}
        };

        this.authorize = function () {
            // Step 3: get authorization to use private data
            gapi.client.setApiKey(this.apiKey);
            gapi.auth.authorize(
                {
                    client_id: internals.clientId,
                    scope: internals.scopes,
                    immediate: false
                },
                internals.handleAuthResult);
            return false;
        };

        if ($window.gapiInitialized) {
            internals.setApiKey();
        } else {
            $window.initGapi = function () {
                internals.setApiKey();
            };
        }

        this.getToken = function () {
            if (!internals.triedOnce) {
                console.log('Calling token before first auth try.');
            }
            return internals.token;
        };

        this.promiseToken = function () {
            return $q(function (resolve, reject) {
                setTimeout(function () {
                    if (internals.token) {
                        resolve(internals.token);
                    } else {
                        console.log('Failed to promise token.');
                        reject(null);
                    }
                }, 1000);
            });
        };

        this.search = function (q) {
            var request = gapi.client.youtube.search.list({
                q: q,
                part: 'snippet'
            }), str = '';
            request.execute(function (response) {
                str = JSON.stringify(response.result);
            });

            return str;
        };

        return {
            search: this.search
        };
    }
}());

// Global
var initGoogleApi = function () {
    if (window.initGapi) {
        window.initGapi();
    } else {
        window.gapiInitialized = true;
    }
};
