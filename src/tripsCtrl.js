'use strict';

/* global angular */

var greetingsApp = angular.module('greetingsApp');

greetingsApp.controller('TripsCtrl', ['$scope', 'ColumnSortService', function TripsCtrl($scope, ColumnSortService) {

    function getSortClass(columnName, sortClasses) {
        return ColumnSortService.determineSortClass(
            columnName,
            $scope.greetModel.sortColumn,
            $scope.greetModel.isReversed,
            sortClasses
        );
    }

    function sortBy(columnName) {
        ColumnSortService.updateSort(columnName, $scope.greetModel);
    }

    $scope.sortBy = sortBy;
    $scope.getSortClass = getSortClass;
}]);