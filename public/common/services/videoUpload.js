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
        var tags = ['youtube-cors-upload']; // todo move tags to upload form
        var categoryId = 22;

        var uploadFile = function (file, metadata, uploadId) {
            $http.put(uploadUrl, file, {
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
        };

        function uploadVideo(video) {
            var metadata = {
                snippet: {
                    title: video.title,
                    description: video.description,
                    tags: tags,
                    categoryId: categoryId
                },
                status: {
                    privacyStatus: video.status
                }
            };
            $http.post(uploadUrl, metadata, {
                params: {
                    part: Object.keys(metadata).join(','),
                    uploadType: 'resumable'
                },
                headers: {
                    'Content-Type': 'application/json',
                    'X-Upload-Content-Length': video.file.size,
                    'X-Upload-Content-Type': video.file.type
                }
            }).
            then(function (response) {
                var uploadId = response.headers('X-GUploader-UploadID');
                uploadFile(video.file, metadata, uploadId);
            }, function() {
                console.log('huyak');
            },
            function(progress) {
                console.log("inside progress");
                console.log(progress);
            });
        }

        return uploadVideo;
    }
})();
