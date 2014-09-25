'use strict';

/* global angular */

var greetingsApp = angular.module('greetingsApp', []);

greetingsApp.value('defaultSortClasses', {
  unsorted: '',
  ascending: 'asc',
  descending: 'desc'
});

greetingsApp.factory('GreetingsFactory', function($http) {
    // a factory returns an object that exposes functions or properties

    var greetingsJsonUrl = 'englishGreeting.json';

    var getGreetings = function() {
        return $http.get(greetingsJsonUrl).then(function(response) {
            // we need to parse some data for use on the client
            // use the angular forEach function to go through the data array
            angular.forEach(response.data, function(item) {
                // we can use angular.isDefined to see if an item/field exists
                if (angular.isDefined(item.visitStartDate)) {
                    item.visitStartDate = new Date(item.visitStartDate);
                }
                if (angular.isDefined(item.visitEndDate)) {
                    item.visitEndDate = new Date(item.visitEndDate);
                }
            });
            return response.data;
        });
    };

    // a factory needs to return an object that exposes functions
    return {
        getGreetings: getGreetings
    };
});


// ----------------- Service with an Object-Oriented Loader ----------------- //

function GreetingsLoader($http) {
    var greetingsJsonUrl = 'greetings.json';

    this.getGreetings = function() {
        return $http.get(greetingsJsonUrl).then(function(response) {
            // we need to parse some data for use on the client
            // use the angular forEach function to go through the data array
            angular.forEach(response.data, function(item) {
                // we can use angular.isDefined to see if an item/field exists
                if (angular.isDefined(item.visitStartDate)) {
                    item.visitStartDate = new Date(item.visitStartDate);
                }
                if (angular.isDefined(item.visitEndDate)) {
                    item.visitEndDate = new Date(item.visitEndDate);
                }
            });
            return response.data;
        });
    };
}

// a service returns the function object itself
// a service automatically returns a 'new' object
// however, it is still a singleton (just like factories and providers)
// using an angular service allows you to use the angular DI

greetingsApp.service('GreetingsService', ['$http', GreetingsLoader]);

greetingsApp.controller('GreetingsCtrl', ['$scope', 'GreetingsFactory', 'GreetingsService', 'defaultSortClasses',
  function($scope, GreetingsFactory, GreetingsService, defaultSortClasses) {
    
    $scope.greetModel = {
      greetings: [],
      isReversed: false,
      orderBy: ''
    };
    
    $scope.defaultSortClasses = defaultSortClasses;

    function removeGreeting(greeting, greetModel) {
      var index = greetModel.greetings.indexOf(greeting);
      greetModel.greetings.splice(index, 1);
    }

    function addGreeting(greeting, greetModel) {
      greetModel.greetings.push(greeting);
      greetModel.addGreet = {};
    }

    function isSortedBy(columnName, orderBy) {
      return (columnName == orderBy);
    }

    function determineSortClass(columnName, orderBy, isReversed, sortClasses) {
      if (!isSortedBy(columnName, orderBy)) {
        return sortClasses.unsorted;
      } else if (isReversed) {
        return sortClasses.descending;
      } else {
        return sortClasses.ascending;
      }
    }

    function updateSort(columnName, greetModel) {
      if (isSortedBy(columnName, greetModel.orderBy)) {
        greetModel.isReversed = !greetModel.isReversed;
      } else {
        greetModel.isReversed = false;
      }

      greetModel.orderBy = columnName;
    }

    function getSortClass(columnName, sortClasses) {
      sortClasses = angular.isUndefined(sortClasses) ?
        $scope.defaultSortClasses : sortClasses;

      return determineSortClass(columnName,
        $scope.greetModel.orderBy,
        $scope.greetModel.isReversed,
        sortClasses);
    }

    function sortBy(columnName) {
      updateSort(columnName, $scope.greetModel);
    }
    
    function loadData() {
      GreetingsFactory.getGreetings().then(function(greetings) {
        $scope.greetModel.greetings = $scope.greetModel.greetings.concat(greetings);
      });
    }
    
    function loadMoreData() {
      GreetingsService.getGreetings().then(function(greetings) {
        $scope.greetModel.greetings = $scope.greetModel.greetings.concat(greetings);
      });
    }

    $scope.sortBy = sortBy;
    $scope.getSortClass = getSortClass;
    $scope.removeGreeting = removeGreeting;
    $scope.addGreeting = addGreeting;
    $scope.loadData = loadData;
    $scope.loadMoreData = loadMoreData;
  }
]);