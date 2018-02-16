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
        ]).controller('rootController', function ($scope, $location, $rootScope, $log, $state) {
        console.log($rootScope);
        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            $log.info("location changing to:" + $state);    //Checking For Using UI Router
            $log.info("location changing to:" + $location); // Checking For Using Ng Router
            });
      
    });
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