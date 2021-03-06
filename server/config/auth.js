var passport = require('passport');
module.exports = {
    login: function(req, res, next) {
        var auth = passport.authenticate('local', function(err, user) {
            if (err) return next(err);
            if (!user) res.send({ success: false });
            req.login(user, function(err) {
                if (err) return next(err);
                res.send({ success: true, user: user })
            })
        })
        auth(req, res, next);
    },
    logout: function(req, res, next) {
        req.logout()
        res.end();
    },
    // checked user is login
    isAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    }
}