(function () {
    'use strict';

    var dashboardModule = angular.module('dashboardModule', [
        // Angular modules 

        // Custom modules 

        // 3rd Party Modules
        'ui.router'
    ]);
    dashboardModule.config(function($stateProvider) {
        $stateProvider.state('dashboard.home',
            {
                url: '/home',
                template: '<home></home>'
            });
    });
})();