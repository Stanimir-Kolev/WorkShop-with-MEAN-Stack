var express = require('express');

var env = process.env.NODE_ENV || "development";
var port = process.env.PORT || 3030;

var app = express();

var config = require('./server/config/config');
// require for express
require('./server/config/express')(app, config);
// require for mongoose
require('./server/config/mongoose')(config);
// require for routes
require('./server/config/routes')(app);

app.listen(port, function() {
    console.log('Server running on port: ' + port); // na koi port slusha 
});