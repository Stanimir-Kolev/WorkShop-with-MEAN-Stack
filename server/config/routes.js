var passport = require('passport');
var auth = require('./auth');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var encryption = require('../utilities/encryption');

module.exports = function(app) {

    app.get('/api/users',
            // auth.isAuthenticated,
            function(req, res) {
                User.find({}).exec(function(err, collection) {
                    if (err) {
                        console.log('Users could not be loaded: ' + err);
                    }
                    res.send(collection);
                })
            })
        // create new user 
    app.post('/api/users', function(req, res, next) {
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);

        User.create(newUserData, function(err, user) {
            if (err) {
                console.log('Failed to register new user: ' + err);
                return;
            }
            req.login(user, function(err) {
                if (err) {
                    res.status(400);
                    return next(err);
                }
                res.send(user);
            })
        })
    });

    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName);
    });

    app.post('/login', auth.login);

    app.post('/logout', auth.logout);

    app.get('*', function(req, res) {
        res.render('index', { currentUser: req.user });
    })
}