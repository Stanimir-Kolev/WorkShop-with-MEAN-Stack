var mongoose = require('mongoose');
var passport = require('passport');
var LocalPassport = require('passport-local');

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

    var userSchema = mongoose.Schema({
        username: String,
        firstName: String,
        lastName: String
            // salt: String,
            // hashPass: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find user: ' + err);
            return;
        }
        if (collection.length === 0) {
            User.create({
                username: 'stanimir.kolev',
                firstName: 'Stanimir',
                lastName: 'Kolev'
                    // salt: String,
                    // hashPass: String  
            })
        }
    })

    // use passport config from documentation
    passport.use(new LocalPassport(function(username, password, done) {
        User.findOne({ username: username }).exec(function(err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }));
    passport.serializeUser(function(user, done) {
        if (user) {
            return done(null, user._id);
        }
    })

    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }).exec(function(err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    })
};