(function() {
    'use strict';

    angular
        .module('dashboardModule')
        .component('home',
        {
            templateUrl: '/application/module/dashboard/component/home/template/home.html',
            controller: homeController
        });
    function homeController($scope, $log) {
        $scope.title = 'homeController';
        activate();
        function activate() {
        }
    }
})();
