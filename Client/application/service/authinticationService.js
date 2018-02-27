angular.module("loginModule").service('authService', ['$http', '$localStorage', function ($http, $localStorage) {
    this.login = function (username, password, callback) {
        var data = {
            username: username,
            password: password,
            grant_type: "password"
        };
        $http({
            method: 'POST',
            url: 'http://localhost:4152/token',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (data) {
                var str = [];
                for (var p in data)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
                return str.join("&");
            },
            data: { username: username, password: password, grant_type: "password" }
        }).then(function (response) {
            // login successful if there's a token in the response
            if (response.status === 200) {
                // store username and token in local storage to keep user logged in between page refreshes
                $localStorage.currentUser = { username: username, token: response.access_token };

                // add jwt token to auth header for all requests made by the $http service
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.access_token;

                // execute callback with true to indicate successful login
                callback(response);
            } else if (response.status!==200){
                // execute callback with false to indicate failed login
                callback(response.code);
            }
        }, function errorCallback(response) {
            if (response) {
                callback(response);
            }
        });
    }
    this.isAuthenticated = function () {
        return !!$localStorage.currentUser;
    };
    this.isAuthorized = function () {
        return this.isAuthenticated();
    };
    this.logout =function() {
        // remove user from local storage and clear http auth header
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
    }
}]);