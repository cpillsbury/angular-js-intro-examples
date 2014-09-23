'use strict';

/* global angular */

/*  Pro-tip: Although it is generally suggested against, when doing Angular development,
    you should declare all of your AngularJS scripts to "use strict", a new feature in ECMAScript 5.
    This will catch common errors in JavaScript and works nicely with useful code quality tools like
    JSLint/JSHint.
 */

/*  Pro-tip: Since the angular.module() method returns a reference to the module created, it's
    usually a good idea to assign that return value to a variable. You may then define any
    controllers, services, directives, filters, etc. simply by referencing that variable.

    NOTE: the angular.module() method is used to both *register* a new module and *reference*
    a previously-registered module. This can be confusing for people new to Angular.
 */
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

        /* Pro-tip: Rather than reaching out and getting/setting properties on the scope,
            write methods that pass in and/or return values affecting the state of the scope.
            Especially for larger applications, this will make your code more maintainable,
            testable, and reusable, and will generally help with the readability of your code.
         */
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

        /* Pro-tip: Use named functions that are then assigned to the scope object in Angular Controllers.
            This allows for a clean distinction between publicly-accessible methods (and properties) vs.
            private methods on the Controller.
         */
        $scope.sortBy = sortBy;
        $scope.getSortClass = getSortClass;
    }
]);