var mongoose = require('mongoose');

module.exports = function(config) {
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

}