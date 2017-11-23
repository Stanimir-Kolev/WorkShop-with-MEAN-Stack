var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV || "development";
var port = 3030;

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/server/views');
// use body-parser for express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// setup for stylus
app.use(stylus.middleware({
    src: __dirname + '/site.css',
    compile: function(src, path) {
        return stylus(str).set('filename', path);
    }
}));
app.use(express.static(__dirname + '/public'));
// setup for mongoDB
mongoose.connect("mongodb://localhost/dataBase");
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
var messageSchema = mongoose.Schema({
    message: String
})
var Message = mongoose.model("Message", messageSchema);
var messageFromDatabase;

Message.remove({}).exec(function(err) {
    if (err) {
        console.log('Messages could not be cleared: ' + err);
        return;
    }

    Message.create({ message: "Hi from mongoose" })
        .then(function(model) {
            messageFromDatabase = model.message;
        })
})


app.get('/partials/:partialName', function(req, res) {
    res.render('partials/' + req.params.partialName);
})

app.get('*', function(req, res) {
    res.render('index', { message: messageFromDatabase });
})

app.listen(port);
console.log("Server running on port: " + port);