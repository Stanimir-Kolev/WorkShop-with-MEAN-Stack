var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');

//config for express
module.exports = function(app, config) {
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + 'server/views');
    // use body-parser for express
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // setup for stylus
    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: function(str, path) {
            return stylus(str).set('filename', path);
        }
    }));
    app.use(express.static(config.rootPath + '/public'));
}