var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV || "development";
var port = process.env.PORT || 3030;

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/server/views');
// use body-parser for express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// setup for stylus
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: function(str, path) {
        return stylus(str).set('filename', path);
    }
}));
app.use(express.static(__dirname + '/public'));
// setup for mongoDB
// for connect with mLab (create user and share db)
mongoose.connect("mongodb://Stanimir:stanimir@ds147964.mlab.com:47964/workshopp", { useMongoClient: true })
var db = mongoose.connection;

db.once('open', function(err) {
    if (err) {
        console.log('Database could not be opened: ' + err);
        return;
    } else {
        console.log('Database up and running......')
    }
})
db.on('error', function(err) {
        console.log('Database error: ' + err);
    })
    // mongoose schema
    // for error (node:4736)
mongoose.Promise = global.Promise;

app.get('/partials/:partialArea/:partialName', function(req, res) {
    res.render('partials/' + req.params.partialArea + '/' + req.params.partialName);
})

app.get('*', function(req, res) {
    res.render('index');
})

app.listen(port, function() {
    console.log('Server running on port: ' + port); // na koi port slusha 
});