(function () {
    'use strict';

    var loginModule = angular.module('loginModule',
        [
            // Angular modules 

            // Custom modules 

            // 3rd Party Modules
            'ui.router'
        ]);
    loginModule.config(function ($stateProvider) {
        var helloState = {
            name: 'login.login',
            url: 'login',
            template: '<login></login>'
        };

        var aboutState = {
            name: 'login.password-reset',
            url: 'password-reset',
            templateUrl: '/application/module/auth/component/password-reset/template/password-reset.html'
        };
        $stateProvider.state(helloState);
        $stateProvider.state(aboutState);
    });
})();