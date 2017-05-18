var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var user = require('./routes/users');
var hvacs = require('./routes/hvacs');
var clients = require('./routes/clients');

// get an instance of router
var router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

// apply the routes to our application
app.use('/', user);
app.use('/hvacs', hvacs);
app.use('/clients', clients);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
