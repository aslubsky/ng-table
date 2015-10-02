/**
 * ngTable: Table + Angular JS
 *
 * @author Vitalii Savchuk <esvit666@gmail.com>
 * @url https://github.com/esvit/ng-table/
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

/**
 * @ngdoc directive
 * @name ngTablePagination
 * @module ngTable
 * @restrict A
 */
app.directive('ngTablePagination', ['$compile',
    function($compile) {
        'use strict';

        return {
            restrict: 'A',
            scope: {
                'params': '=ngTablePagination',
                'templateUrl': '='
            },
            replace: false,
            link: function(scope, element, attrs) {

                var settings = scope.params.settings();
                settings.$scope.$on('ngTableAfterReloadData', function() {
                    var page = scope.params.page(),
                        total = scope.params.total(),
                        count = scope.params.count(),
                        maxBlocks = settings.paginationMaxBlocks;
                    scope.pages = scope.params.generatePagesArray(page, total, count, maxBlocks);
                }, true);

                scope.$watch('templateUrl', function(templateUrl) {
                    if (angular.isUndefined(templateUrl)) {
                        return;
                    }
                    var template = angular.element(document.createElement('div'))
                    template.attr({
                        'ng-include': 'templateUrl'
                    });
                    element.append(template);
                    $compile(template)(scope);
                });
            }
        };
    }
]);
