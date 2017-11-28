var mongoose = require('mongoose');
var crypto = require('crypto');

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
        lastName: String,
        salt: String,
        hashPass: String,
        roles: [String]
    });
    // chek hashPass it is salted
    userSchema.method({
        authenticate: function(password) {
            if (generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            } else return false;
        }
    })
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find user: ' + err);
            return;
        }
        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            salt = generateSalt();
            hashedPwd = generateHashedPassword(salt, 'stanimir');
            User.create({
                username: 'stanimir.kolev',
                firstName: 'Stanimir',
                lastName: 'Kolev',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['admin']
            })
        }
    })
};
// crypto modul from nodejs
function generateSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function generateHashedPassword(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}