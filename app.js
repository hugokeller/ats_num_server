// BASE SETUP
// ==============================================

var express = require('express');
var app     = express();
var port    =   process.env.PORT || 8080;

var user = require('./routes/users');

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


// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
