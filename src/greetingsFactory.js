'use strict';

/* global angular */

var greetingsApp = angular.module('greetingsApp');

greetingsApp.factory('GreetingsFactory', function($http) {
    // a factory returns an object that exposes functions or properties

    var greetingsJsonUrl = './resources/englishGreeting.json';

    var getGreetings = function() {
        return $http.get(greetingsJsonUrl).then(function(response) {
            return response.data;
        });
    };

    // a factory needs to return an object that exposes functions
    return {
        getGreetings: getGreetings
    };
});