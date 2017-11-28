app.factory('identity', function($window) {
    // to save current user in client
    return {
        currentUser: JSON.parse(localStorage.getItem('user')),
        isAuthenticated: function() {
            return !!this.currentUser;
        }
    }
})