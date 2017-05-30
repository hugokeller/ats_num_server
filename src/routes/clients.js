var express = require('express');
var router = express.Router();

var connection = require('../utils/dbconnection');

/**
 * Get clients by id
 */
router.get('/:id', function(req, res) {
    var query = 'SELECT * ' +
        'FROM CLIENT ' +
        'WHERE idClient=' + req.params.id;
    connection.connect();
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        res.json(rows[0]);
    });
    connection.end();
});

/**
 *
 */

var bodyParser = require('body-parser');
bodyParser = bodyParser.json();
var cors = require('cors');
var corsOptions = {
    origin : '*',
    headers : 'Content-Type'
};
var auth = require('../utils/auth');
router.post('/auth', bodyParser, cors(corsOptions), function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
    var login = req.body.email;
    var password = req.body.password;
    console.log(req.body);
    // res.json(auth.token(login, password))
    res.json(req.body)
});

module.exports = router;
