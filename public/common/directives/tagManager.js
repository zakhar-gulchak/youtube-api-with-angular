/**
 * Created by z.gulchak on 10/5/2015.
 */
(function () {
    'use strict';

    angular.module('common.directives').directive('tagManager', tagManager);

    function tagManager() {
        return {
            restrict: 'E',
            templateUrl: '/common/directives/tagManager.html',
            scope: { video: '=' },
            link: function(scope) {
                scope.addTags = function() {
                    var newTags = scope.newTags;
                    if (newTags) {
                        var array = newTags.split(',');
                        var isNew = true;
                        array.forEach(function (item) {
                            if (scope.video.tags.indexOf(item) !== -1) {
                                isNew = false;
                            }
                        });
                        if (isNew) {
                            scope.video.tags = scope.video.tags ? scope.video.tags.concat(array) : array;
                            scope.newTags = "";
                        } else {
                            toastr.error('Tag exist! Please type new tag!');
                        }
                    } else {
                        toastr.error("Please enter one or more tags separated by commas");
                    }
                };

                scope.removeTag = function (idx) {
                    scope.video.tags.splice(idx, 1);
                };
            }
        };
    }
}());