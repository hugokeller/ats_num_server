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
    connection.query(query, function(err, rows, fields) {
        if (err){
            res.send({error:'wrong request', code:0, verb:err});
            return null;
        }
        res.json(rows);
    });
});

/**
 * Get a single hvac by its id
 */
router.get('/:id', function(req, res) {
    var query = 'SELECT * ' +
        'FROM HVAC ' +
        'WHERE idHvac=' + req.params.id;
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        res.json(rows[0]);
    });
});

/**
 * Get HVACs readable by a client
 */
router.post('/read', function(req, res){
    var idClient = req.body.idClient;
    var query = 'SELECT * ' +
            'FROM HVAC ' +
            'INNER JOIN AUTORISATION ' +
                'ON HVAC.idHvac = AUTORISATION.idHvac ' +
            'WHERE AUTORISATION.idClient = ' + idClient;
    connection.query(query, function(err, rows, fields) {
            if (err){
                res.send({error:'wrong request', code:0, verb:err});
                return null;
            }
            var token = req.headers['authorization'];
            if (token) {
                jwt.verify(token, 'atsnumecam', function(err, decoded) {
                    if (err) {
                        res.send({ success: false, message: 'Failed to authenticate token.' });
                        return null;
                    } else {
                        req.decoded = decoded;
                        res.send(rows);
                    }
                });
            } else {
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });

            }
        });
});

/**
 * Create new hvac
 */
router.post('/', function(req, res) {
    var sMatricule = req.body.sMatricule.value;
    var sNomHvac = req.body.sNomHvac.value;
    var idClient = req.body.idClient;
    console.log(sNomHvac, sMatricule);
    var queryHvac = "INSERT INTO `HVAC` " +
        "(`sMatricule`, `sNomHvac`, `idLieu`) " +
        "VALUES ('" + sMatricule + "', '" + sNomHvac + "', '1')";
    connection.query(queryHvac, function(error, result, fields) {
        if (error){
            res.send({error:'wrong request 1 ', code:0, verb:error});
            return null;
        }
        var idHvac = result.insertId;
        var queryAuth = "INSERT INTO `AUTORISATION` " +
            "(`idClient`, `idHvac`, `idDroit`) " +
            "VALUES ('" + idClient + "', '" + idHvac + "', '1')";
        connection.query(queryAuth, function(error, result, fields) {
            if (error){
                res.send({error:'wrong request 2', code:0, verb:error});
                return null;
            }
            res.send({status: 'OK', userId:result});
        });
    })
});

module.exports = router;
