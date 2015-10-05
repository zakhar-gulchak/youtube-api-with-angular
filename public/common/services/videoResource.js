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
            deleteVideo: $resource(
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
            },
            handleVideoList: function (data) {
                var videos = [];
                data.items.forEach(function (item) {
                    videos.push({
                        id: item.snippet.resourceId.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        src: item.snippet.thumbnails.default.url
                    });
                });

                return videos;
            },
            setMetadata: function (data) {
                var item = data.items[0].snippet;
                var video = {
                    id: data.items[0].id,
                    tags: [],
                    title: item.title,
                    description: item.description,
                    status: data.items[0].status.privacyStatus,
                    src: 'https://www.youtube.com/embed/' + data.items[0].id,
                    publishDate: item.publishedAt
                };
                if (item.tags) {
                    video.tags = item.tags;
                }

                return video;
            }
        };
    }
}());
