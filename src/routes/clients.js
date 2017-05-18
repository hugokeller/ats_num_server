var express = require('express');
var router = express.Router();

var connection = require('../utils/dbconnection');

/**
 * Get clients by id
 */
router.get('/:id', function(req, res) {
    var query = 'SELECT * ' +
        'FROM ats_08.CLIENT ' +
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

var auth = require('../utils/auth');
router.post('/auth', function(req, res) {
    var login = req.body.email;
    var password = req.body.password;
    res.json(auth.token(login, password))
});

module.exports = router;
