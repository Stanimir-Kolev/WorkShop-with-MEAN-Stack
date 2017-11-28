app.factory('auth', function($q, $http, identity) {
    return {
        login: function(user) {
            //promise
            var deferred = $q.defer();
            $http.post('/login', user).then(function(response) {
                if (response.data.success) {
                    identity.currentUser = response.config.data;
                    // append userObject in localStorage to access in identity
                    var currentUser = JSON.stringify(response.data.user);
                    localStorage.setItem('user', currentUser);
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            });
            return deferred.promise;
        },
        logout: function() {
            var deferred = $q.defer();
            $http.post('/logout').then(function() {
                identity.currentUser = undefined;
                deferred.resolve();
                localStorage.clear();
            });
            return deferred.promise;
        }
    }
})