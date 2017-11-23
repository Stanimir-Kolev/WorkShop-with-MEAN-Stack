var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    // za da premahnem # 
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });

    $routeProvider
        .when('/', {
            templateUrl: '/partials/home',
            controller: 'MainCtrl'
        })
})

app.controller('MainCtrl', function($scope) {
    $scope.hello = 'hello from angularo';
})