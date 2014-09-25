'use strict';

/* global angular */

var greetingsApp = angular.module('greetingsApp');

// ----------------- Service with an Object-Oriented Loader ----------------- //

function GreetingsLoader($http) {
    var greetingsJsonUrl = './resources/greetings.json';

    this.getGreetings = function() {
        return $http.get(greetingsJsonUrl).then(function(response) {
            return response.data;
        });
    };
}

// a service returns the function object itself
// a service automatically returns a 'new' object
// however, it is still a singleton (just like factories and providers)
// using an angular service allows you to use the angular DI
greetingsApp.service('GreetingsService', ['$http', GreetingsLoader]);