var express = require('express');
var router = express.Router();

var connection = require('../utils/dbconnection');

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
    var query = 'SELECT * ' +
        'FROM ats_08.HVAC';
    connection.connect();
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
    connection.end();
});

// about page route (http://localhost:8080/about)
router.get('/:id', function(req, res) {
    var query = 'SELECT * ' +
        'FROM ats_08.HVAC ' +
        'WHERE idHvac=' + req.params.id;
    connection.connect();
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        res.json(rows[0]);
    });
    connection.end();
});

module.exports = router;
