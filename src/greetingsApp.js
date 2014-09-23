'use strict';

/* global angular */

var greetingsApp = angular.module('greetingsApp', []);

greetingsApp.controller('GreetingsCtrl', ['$scope',
    function($scope) {
        $scope.greetModel = {};
        $scope.greetModel.greetings = [{
            hello: 'Hello',
            world: 'world',
            language: 'English',
            visitDate: new Date(2010,10,28)
        }, {
            hello: 'Guten Tag',
            world: 'Welt',
            language: 'German',
            visitDate: new Date(1999, 12, 31)
        }, {
            hello: 'Hola',
            world: 'mundo',
            language: 'Spanish'
        }, {
            hello: 'Bonjour',
            world: 'monde',
            language: 'French',
            visitDate: new Date(2013, 8, 15)
        }, {
            hello: 'Ciao',
            world: 'mondo',
            language: 'Italian',
            visitDate: new Date(1993, 1, 29)
        }, {
            hello: 'Konnichiwa',
            world: 'sekai',
            language: 'Japanese',
            visitDate: new Date(2000, 1, 1)
        }, {
            hello: 'Selam',
            world: 'dünya',
            language: 'Turkish',
            visitDate: new Date(2013, 8, 15)
        }, {
            hello: 'Namaste',
            world: 'duniyā',
            language: 'Hindi',
            visitDate: new Date(2014, 6, 17)
        }, {
            hello: 'NuqneH',
            world: '\'u\'',
            language: 'Klingon'
        }];

        $scope.greetModel.isReversed = true;

        $scope.defaultSortClasses = {
            unsorted: '',
            ascending: 'asc',
            descending: 'desc'
        };

        function isSortedBy(columnName, sortColumn) {
            return (columnName == sortColumn);
        }

        function determineSortClass(columnName, sortColumn, isReversed, sortClasses) {
            if (!isSortedBy(columnName, sortColumn)) {
                return sortClasses.unsorted;
            } else if (isReversed) {
                return sortClasses.descending;
            } else {
                return sortClasses.ascending;
            }
        }

        function updateSort(columnName, greetModel) {
            if (isSortedBy(columnName, greetModel.sortColumn)) {
                greetModel.isReversed = !greetModel.isReversed;
            } else {
                greetModel.isReversed = false;
            }

            greetModel.sortColumn = columnName;
        }

        function getSortClass(columnName, sortClasses) {
            sortClasses = angular.isUndefined(sortClasses) ?
                $scope.defaultSortClasses : sortClasses;

            return determineSortClass(columnName,
                $scope.greetModel.sortColumn,
                $scope.greetModel.isReversed,
                sortClasses);
        }

        function sortBy(columnName) {
            updateSort(columnName, $scope.greetModel);
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