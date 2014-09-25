'use strict';

/* global angular */

var greetingsApp = angular.module('greetingsApp');

greetingsApp.controller('GreetingsCtrl', ['$scope', 'GreetingsFactory', 'GreetingsService', 'ColumnSortService', 'TripsService',
    function GreetingsCtrl($scope, GreetingsFactory, GreetingsService, ColumnSortService, TripsService) {

        $scope.greetModel = {
            greetings: [],
            isReversed: false,
            orderBy: ''
        };

        GreetingsFactory.getGreetings().then(function(greetings) {
            $scope.greetModel.greetings = $scope.greetModel.greetings.concat(greetings);

            GreetingsService.getGreetings().then(function(greetings) {
                $scope.greetModel.greetings = $scope.greetModel.greetings.concat(greetings);
            });
        });

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

        function removeGreeting(greeting, greetModel) {
            var index = greetModel.greetings.indexOf(greeting);
            greetModel.greetings.splice(index, 1);
        }

        function addGreeting(greeting, greetModel) {
            greetModel.greetings.push(greeting);
            greetModel.addGreet = {};
        }

        $scope.sortBy = sortBy;
        $scope.getSortClass = getSortClass;
        $scope.removeGreeting = removeGreeting;
        $scope.addGreeting = addGreeting;
    }
]);