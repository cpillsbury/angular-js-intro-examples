'use strict';

/* global angular */

var greetingsApp = angular.module('greetingsApp');

greetingsApp.controller('TripsCtrl', ['$scope', 'trips', 'ColumnSortService', function TripsCtrl($scope, trips, ColumnSortService) {

    $scope.tripModel = {};
    $scope.tripModel.trips = trips | [];

    function getSortClass(columnName, sortClasses) {
        return ColumnSortService.determineSortClass(
            columnName,
            $scope.tripModel.sortColumn,
            $scope.tripModel.isReversed,
            sortClasses
        );
    }

    function sortBy(columnName) {
        ColumnSortService.updateSort(columnName, $scope.tripModel);
    }

    $scope.sortBy = sortBy;
    $scope.getSortClass = getSortClass;
}]);