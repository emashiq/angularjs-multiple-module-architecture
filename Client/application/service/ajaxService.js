(function () {
    'use strict';

    angular
        .module('app')
        .service('ajaxService', ajaxService);

    ajaxService.$inject = ['$http'];

    function ajaxService($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() { }
    }
})();