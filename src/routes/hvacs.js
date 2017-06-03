var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var connection = require('../utils/dbconnection');

/**
 * get all hvacs
 */
router.get('/allhvacs', function(req, res) {
    var query = 'SELECT * ' +
        'FROM HVAC';
    connection.connect();
    connection.query(query, function(err, rows, fields) {
        if (err){
            res.send({error:'wrong request', code:0, verb:err});
            return null;
        }
        res.json(rows);
    });
    connection.end();
});

/**
 * Get a single hvac by its id
 */
router.get('/:id', function(req, res) {
    var query = 'SELECT * ' +
        'FROM HVAC ' +
        'WHERE idHvac=' + req.params.id;
    connection.connect();
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        res.json(rows[0]);
    });
    connection.end();
});

/**
 * Get HVACs readable by a client
 */
router.post('/read', function(req, res){
    var idClient = req.body.idClient;
    var token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, 'atsnumecam', function(err, decoded) {
            if (err) {
                res.send({ success: false, message: 'Failed to authenticate token.' });
                return null;
            } else {
                req.decoded = decoded;
                res.send([
                    {
                        idHvac:1,
                        sNomHvac: 'blabla',
                        sMatricule: 'GJFKJFL'
                    },{
                        idHvac:1,
                        sNomHvac: 'dzpldzpldzpldpz',
                        sMatricule: 'KLNDZL'
                    }
                ]);
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
var query = 'SELECT * ' +
        'FROM HVAC ' +
        'INNER JOIN AUTORISATION ' +
            'ON HVAC.idHvac = AUTORISATION.idHvac ' +
        'WHERE AUTORISATION.idClient = ' + idClient;
 /*   connection.query(query, function(err, rows, fields) {
        if (err){
            res.send({error:'wrong request', code:0, verb:err});
            return null;
        }
        res.send(rows);
    });
  */

});

module.exports = router;
