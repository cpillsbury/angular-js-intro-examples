'use strict';

/* global angular */

var greetingsApp = angular.module('greetingsApp');

greetingsApp.service('TripsService', function TripsService($http) {
    var greetingsJsonUrl = './resources/greetings.json';

    this.getTripsByCountry = function(country) {
        return $http.get(greetingsJsonUrl).then(function(response) {
            var trips = [];
            // we need to parse some data for use on the client
            // use the angular forEach function to go through the data array
            angular.forEach(response.data, function(item) {
                // we can use angular.isDefined to see if an item/field exists
                if (item.country == country) {
                    if (angular.isDefined(item.trips)) {
                        angular.forEach(item.trips, function(trip) {
                            if (angular.isDefined(trip.visitDate)) {
                                trip.visitDate = new Date(item.visitStartDate);
                            }
                        });
                    }
                    trips = item.trips;
                }
            });
            return trips;
        });
    };
});