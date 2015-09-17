/**
 * Created by z.gulchak on 9/15/2015.
 */
(function () {
    'use strict';

    angular
        .module('common.services')
        .factory('gapiService', gapiService);

    function gapiService(GAuth, GData) {
        var internals = {
            clientId: '718637650333-fd4d1dd8hj25o9dke4bj6rve41k1n00n.apps.googleusercontent.com',
            //apiKey: 'V4pAvT7D8MRkbaEWnxZxkBoY',
            scopes: 'https://www.googleapis.com/auth/youtube',
            //loadGAPIUrl: 'https://apis.google.com/js/client.js?onload=initGoogleApi',
            loadGAPIUrl: 'https://www.googleapis.com/plus/v1/activities?query=Google%2B&orderBy=best',
            MAX_RESULTS: 50,

            triedOnce: false,

            token: null,

            setApiKey: function () {
                // Step 2: Reference the API key
                gapi.client.setApiKey(internals.apiKey);
                setTimeout(internals.checkAuth, 1);
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
            loadAPIClientInterfaces: function () {
                gapi.client.load('youtube', 'v3', function () {
                    internals.handleAPILoaded();
                });
            },
            handleAPILoaded: function () {
                // todo delete or write some code
            }
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

        this.search = function (q) {
            var request = gapi.client.youtube.search.list({
                q: q,
                maxResults: internals.MAX_RESULTS,
                part: 'snippet'
            });
            request.execute(function (response) {
                return JSON.stringify(response.result);
            });
        };

        this.getUser = function () {
            var request = gapi.client.youtube.search.list({
                q: q,
                maxResults: internals.MAX_RESULTS,
                part: 'snippet'
            });
            request.execute(function (response) {
                return JSON.stringify(response.result);
            });
        };

        return {
            search: this.search,
            checkAuth: this.getToken,
            authorize: this.authorize,
            getUser: this.getUser
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
