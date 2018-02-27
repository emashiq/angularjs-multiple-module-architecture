(function () {
    'use strict';

    angular
        .module('loginModule')
        .component('login',
            {
                templateUrl: '/application/module/auth/component/login/template/login.html',
                controller: loginController
            });
    function loginController($scope, $log, authService, $state, $rootScope, notify, AUTH_EVENTS) {
        $scope.title = 'loginController';
        activate();
        function activate() {
            
        }
        var authData = {};
        var callBackResult = function(response) {
            if (response.status === 200) {
                $state.go('dashboard.home');
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            } else {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                notify({
                    message: response.data.error_description,
                    classes: 'w3-pale-yellow',
                    templateUrl: '/application/layout/notify.html',
                    position: 'right',
                    duration: 5000
                });
            }
        }
        $scope.login = function() {
            $log.info($scope.email);
            $log.info($scope.password);
            authService.login($scope.email, $scope.password, callBackResult);
        };
    };
})();
