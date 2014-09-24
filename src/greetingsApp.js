'use strict';

/* global angular */

var greetingsApp = angular.module('greetingsApp', []);

/* Pro-tip: Angular supports a number of built-in services and convenience methods on modules
    for creating these services. At their root, however, every service type (constants, values,
    factories, services, and providers) are all Angular providers.  All other services are
    "syntactic sugar" wrapping the core provider service. You should choose the type of service
    based on the expected use case(s).
 */
/* Pro-tip: Use the constant service to configure default (library or application) module properties.
    These can be injected *anywhere* in your application, including during Angular's "configuration
    phase."
 */
greetingsApp.constant('defaultSortClasses', {
    unsorted: '',
    ascending: 'asc',
    descending: 'desc'
});

/* Pro-tip: Factories are types of providers, and services and values are types of factories. The primary
    difference between the service pattern and the factory pattern has to do with what gets injected (into, say
    a Controller). A factory injects whatever is *returned* by the factory function registered. In the example
    below, this will be "greetModel." A service, on the other hand, injects an *instance* of the function itself.
    Depending on your use case, one may make more sense (or be more performant).
 */
greetingsApp.factory('greetFactory', function() {
    var greetModel = {};
    greetModel.greetings = [{
        hello: 'Hello',
        world: 'world',
        language: 'English',
        visitDate: new Date(2010, 10, 28)
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

    greetModel.isReversed = false;

    return greetModel;
});

/* Pro-tip: Don't confuse the *registered name* of an injectable Angular feature
    (e.g. the scope, Angular services, etc.) with its *variable or argument name*. The former
    are defined as strings (which are used to look up their registration in a given module), whereas
    the latter are simply local variables to reference those injected entities. With Angular controllers,
    the former are listed as string elements of an array (passed in as the second parameter of the
    controller() method), where the controller *function* is the last element of the array, and the
    parameters of that function are the corresponding variables for those injected entities
    (corresponding to the order in which they appear in the array).
 */
greetingsApp.controller('GreetingsCtrl', ['$scope', 'greetFactory', 'defaultSortClasses',
    function GreetingsCtrl($scope, GreetModel, defaultSortClasses) {

        $scope.greetModel = GreetModel;
        $scope.defaultSortClasses = defaultSortClasses;

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