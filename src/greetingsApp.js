'use strict';

/* global angular */

var greetingsApp = angular.module('greetingsApp', ['ngRoute']);

greetingsApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/Greetings', {
                templateUrl: 'templates/GreetingsCtrl.html',
                controller: 'GreetingsCtrl'
            }).
            otherwise({
                redirectTo: '/Greetings'
        });
    }]);

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