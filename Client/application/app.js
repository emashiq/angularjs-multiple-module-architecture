(function() {
    'use strict';

    var app = angular.module('app',
        [
            // Angular modules 
            // Custom modules 
            'loginModule',
            'dashboardModule',
            // 3rd Party Modules
            'ui.router',
            'ngStorage',
            'cgNotify',
            'ui.router.state.events'

        ]).controller('rootController', function ($scope, $location, $transitions, $rootScope, $log, $state, authService, AUTH_EVENTS) {
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
                redirectTo: 'dashboard.home',
                data: {
                    "IsAuthorize": true
                },
                controller: function($scope,$localStorage,$log,$state) {
                    $scope.logOut = function () {
                        $localStorage.$reset();
                        $state.go('login');
                    }
                }
    });

    }).constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
        }).config(function ($httpProvider) {
            $httpProvider.interceptors.push([
                '$injector',
                function ($injector) {
                    return $injector.get('AuthInterceptor');
                }
            ]);
        })
        .factory('AuthInterceptor', function ($rootScope, $q,
            AUTH_EVENTS) {
            return {
                responseError: function (response) {
                    $rootScope.$broadcast({
                        401: AUTH_EVENTS.notAuthenticated,
                        403: AUTH_EVENTS.notAuthorized,
                        419: AUTH_EVENTS.sessionTimeout,
                        440: AUTH_EVENTS.sessionTimeout
                    }[response.status], response);
                    return $q.reject(response);
                }
            };
        }).factory('AuthResolver', function ($q, $rootScope, $state) {
            return {
                resolve: function () {
                    var deferred = $q.defer();
                    var unwatch = $rootScope.$watch('currentUser', function (currentUser) {
                        if (angular.isDefined(currentUser)) {
                            if (currentUser) {
                                deferred.resolve(currentUser);
                            } else {
                                deferred.reject();
                                $state.go('login');
                            }
                            unwatch();
                        }
                    });
                    return deferred.promise;
                }
            };
        }).run(function ($rootScope, $state, $stateParams, $transitions, authService, AUTH_EVENTS, $injector) {
            $rootScope.$on('$stateChangeStart', function (event, next) {
                var authorizedRoles = next.data;
                if (authorizedRoles) {
                    if (authorizedRoles.IsAuthorize) {
                        if (authService.isAuthenticated()) {
                            // user is not allowed
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        } else {
                            // user is not logged in
                            event.preventDefault();
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                            return $state.go('login');
                        }
                    }
                }
                   
            });
        });
})();