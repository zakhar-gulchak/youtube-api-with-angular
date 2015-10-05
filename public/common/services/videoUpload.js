/**
 * Created by z.gulchak on 9/24/2015.
 */
(function () {
    'use strict';

    angular
        .module('common.services')
        .factory('VideoUpload', VideoUpload);

    VideoUpload.$inject = ['$http'];

    function VideoUpload($http) {
        var uploadUrl = 'https://www.googleapis.com/upload/youtube/v3/videos';
        var updateUrl = 'https://www.googleapis.com/youtube/v3/videos';
        var categoryId = 22;

        function uploadVideo(video) {
            var metadata = setMetadata(video);

            return sendMetadata(video, metadata)
                .then(function (response) {
                    var uploadId = response.headers('X-GUploader-UploadID');
                    uploadFile(video.file, metadata, uploadId);
                }, function (error) {
                    return error;
                });
        }

        function updateMetadata(video) {
            return $http.put(updateUrl, setMetadata(video), {
                params: {
                    part: 'snippet,status',
                    alt: 'json'
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        /////////

        function uploadFile (file, metadata, uploadId) {
            return $http.put(uploadUrl, file, {
                params: {
                    part: Object.keys(metadata).join(','),
                    uploadType: 'resumable',
                    upload_id: uploadId
                },
                headers: {
                    'Content-Type': file.type,
                    'X-Upload-Content-Type': file.type
                }
            });
        }

        function sendMetadata(video, metadata) {
            return $http.post(uploadUrl, metadata, {
                params: {
                    part: Object.keys(metadata).join(','),
                    uploadType: 'resumable'
                },
                headers: {
                    'Content-Type': 'application/json',
                    'X-Upload-Content-Length': video.file.size,
                    'X-Upload-Content-Type': video.file.type
                }
            });
        }

        function setMetadata(video) {
            return {
                id: video.id,
                snippet: {
                    title: video.title,
                    description: video.description,
                    tags: video.tags,
                    categoryId: categoryId
                },
                status: {
                    privacyStatus: video.status
                }
            };
        }

        return {
            uploadVideo: uploadVideo,
            updateMetadata: updateMetadata
        };
    }
})();
