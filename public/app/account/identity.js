app.factory('identity', function(UsersResource) {
    if (localStorage.getItem('user') !== null)
        var curUser = angular.extend(new UsersResource(), JSON.parse(localStorage.getItem('user')));
    return {
        currentUser: curUser,
        isAuthenticated: function() {
            return !!this.currentUser;
        }
    }
})