var express = require('express');
var router = express.Router();

/**
 * Database connection
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'lampdev.ecam.fr',
    user     : 'ats_08',
    password : 'QTbqp94'
});

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
    res.send('im the home page!');
});

// about page route (http://localhost:8080/about)
router.get('/about', function(req, res) {
    var result = {};
    connection.connect();
    connection.query('SELECT * from ats_08.LIEU', function(err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
    connection.end();
});

module.exports = router;
