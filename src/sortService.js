'use strict';

/* global angular */

var greetingsApp = angular.module('greetingsApp');

greetingsApp.service('ColumnSortService', ['defaultSortClasses',
    function ColumnSortService(defaultSortClasses) {

        this.defaultSortClasses = defaultSortClasses;

        function isSortedBy(columnName, sortColumn) {
            return (columnName == sortColumn);
        }

        this.determineSortClass = function determineSortClass(columnName, sortColumn, isReversed, sortClasses) {

            sortClasses = angular.isUndefined(sortClasses) ?
                this.defaultSortClasses : sortClasses;

            if (!isSortedBy(columnName, sortColumn)) {
                return sortClasses.unsorted;
            } else if (isReversed) {
                return sortClasses.descending;
            } else {
                return sortClasses.ascending;
            }
        }

        this.updateSort = function updateSort(columnName, model) {
            if (isSortedBy(columnName, model.sortColumn)) {
                model.isReversed = !model.isReversed;
            } else {
                model.isReversed = false;
            }

            model.sortColumn = columnName;
        }
}]);