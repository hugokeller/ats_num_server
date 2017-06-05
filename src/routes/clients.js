var express = require('express');
var router = express.Router();

var connection = require('../utils/dbconnection');
var sha256 = require('sha256');
var jwt = require('jsonwebtoken');

/**
 * Get clients by id
 */
router.get('/:id', function(req, res) {
/*    var query = 'SELECT * ' +
        'FROM CLIENT ' +
        'WHERE idClient=' + req.params.id;
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        res.json(rows[0]);
    });
    */
    var token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, 'atsnumecam', function(err, decoded) {
            if (err) {
                res.send({ success: false, message: 'Failed to authenticate token.' });
                return null;
            } else {
                req.decoded = decoded;
                res.send(
                    {
                        idClient:1,
                        sPrenomClient: 'Hugo',
                        sNomClient: 'Keller',
                        sEntreprise: 'ECAM',
                        sEmailClient: 'hugo@ecam.fr',
                        sPassword: sha256('hugo')
                    }
                );
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

/**
 * Create new client
 */
router.post('/', function(req, res) {
    var query = 'INSERT INTO ';
    connection.query(query, function(error, result, fields) {
        if (error){
            res.send({error:'wrong request', code:0, verb:error});
            return null;
        }
        res.send({status: 'OK', userId:result});
    })
});

module.exports = router;
