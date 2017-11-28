app.controller('LoginCtrl', function($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;
    $scope.login = function(user) {
        auth.login(user).then(function(success) {
            if (success) {
                notifier.success('Successful login!');
            } else {
                notifier.error('User/Password is not valid!');
            }
        })
    }
    $scope.signOut = function() {
        auth.logout().then(function() {
            notifier.success('Successful logout!');
            $scope.identity = undefined;
            $location.path('/');
            $scope.user.username = '';
            $scope.user.password = '';
        })
    }
})