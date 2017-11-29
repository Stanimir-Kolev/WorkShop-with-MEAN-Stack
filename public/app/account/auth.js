app.factory('auth', function($q, $http, identity, UsersResource) {
    return {
        signup: function(user) {
            var newUser = new UsersResource(user);
            var deferred = $q.defer();
            newUser.$save().then(function() {
                identity.currentUser = newUser;
                deferred.resolve();
            }, function(response) {
                deferred.reject(response.data.reson)
            })
            return deferred.promise;
        },
        login: function(user) {
            //promise
            var deferred = $q.defer();
            $http.post('/login', user).then(function(response) {
                if (response.data.success) {
                    identity.currentUser = angular.extend(new UsersResource(), response.data.user);
                    // append userObject in localStorage to access in identity
                    localStorage.setItem('user', JSON.stringify(identity.currentUser));
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