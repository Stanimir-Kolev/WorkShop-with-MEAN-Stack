var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

//config for express
module.exports = function(app, config) {
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + 'server/views');
    // use body-parser for express
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // use session
    app.set('trust proxy', 1); // trust first proxy
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }));
    // setup for stylus
    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: function(str, path) {
            return stylus(str).set('filename', path);
        }
    }));
    // set (use) config
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));
}