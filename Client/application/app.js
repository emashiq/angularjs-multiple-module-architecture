(function() {
    'use strict';

    var app = angular.module('app',
        [
           

            // Angular modules 

            // Custom modules 
            'loginModule',
            'dashboardModule',
            // 3rd Party Modules
        'ui.router'
        ]);
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('login',
            {
                url: '/',
                template: '<div ui-view></div>',
                redirectTo: 'login.login'
            })
            .state('dashboard',
                {
                    url: '/dashboard',
                    templateUrl: 'application/layout/dashboard.html',
                    redirectTo:'dashboard.home'
                });

    });
})();