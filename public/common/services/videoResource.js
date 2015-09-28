(function () {
    'use strict';

    angular
        .module('common.services')
        .factory('VideoResource', VideoResource);

    VideoResource.$inject = ['$resource'];

    function VideoResource($resource) {
        var MAX_RESULTS = 50;
        var YOUTUBE_SEARCH_REST_URL = 'https://www.googleapis.com/youtube/v3/search';
        var YOUTUBE_CHANNEL_REST_URL = 'https://www.googleapis.com/youtube/v3/channels';
        var YOUTUBE_PLAYLIST_ITEMS_REST_URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
        var YOUTUBE_VIDEOS_METADATA_REST_URL = 'https://www.googleapis.com/youtube/v3/videos';

        return {
            search: $resource(
                YOUTUBE_SEARCH_REST_URL, {}, {
                    'query': {
                        method: 'GET',
                        params: {
                            part: 'snippet',
                            maxResults: MAX_RESULTS,
                            q: '@searchText'
                        }
                    }
                }
            ),
            getListFromChannel: $resource(
                YOUTUBE_CHANNEL_REST_URL, {}, {
                    'query': {
                        method: 'GET',
                        params: {
                            part: 'contentDetails',
                            mine: true
                        }
                    }
                }
            ),
            getVideosFromPlaylist: $resource(
                YOUTUBE_PLAYLIST_ITEMS_REST_URL, {}, {
                    'query': {
                        method: 'GET',
                        params: {
                            part: 'snippet',
                            playlistId: '@playlistId'
                        }
                    }
                }
            ),
            getVideosMetadata: $resource(
                YOUTUBE_VIDEOS_METADATA_REST_URL, {}, {
                    'query': {
                        method: 'GET',
                        params: {
                            part: 'snippet,status',
                            id: '@videoId'
                        }
                    }
                }
            ),
            deleteVideo:  $resource(
                YOUTUBE_VIDEOS_METADATA_REST_URL, {}, {
                    'query': {
                        method: 'DELETE',
                        params: {
                            id: '@videoId'
                        }
                    }
                }
            ),
            filterVideosFromThread: function (items) {
                var arr = [];
                items.forEach(function (item) {
                    if (item.id.kind === 'youtube#video') {
                        arr.push(item);
                    }
                });

                return arr;
            }
        };
    }
}());
