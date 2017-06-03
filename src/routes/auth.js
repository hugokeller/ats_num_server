var express = require('express');
var router = express.Router();

var secret = 'atsnumecam';
var jwt = require('jsonwebtoken');
var connection = require('../utils/dbconnection');

/**
 *
 */

router.post('/', function(req, res) {
    var login = req.body.email;
    var password = req.body.password;
    //auth(login,password, res);
    if ('hugo' === password){
        var token = jwt.sign({login: login}, secret);
        res.send({token: token, idUser:1});
    }else {
        res.send({error: 'bad credentials', code:2})
    }
});



var auth = function(login, password, res){
    var query = 'SELECT * ' +
        'FROM ats_08.CLIENT ' +
        'WHERE sEmailClient=\"' + login + '\"';
    var user = {};
    connection.connect();
    connection.query(query, function(err, rows, fields) {
        if (err){
            res.send({error:'wrong request', code:0, verb:err});
            return null;
        }
        if (rows.length === 0){
            res.send({error: 'no user found', code:1});
            return null;
        }
        user = rows[0];
        connection.end();
        if (user.sPassword === password){
            var token = jwt.sign({login: login}, secret);
            res.send({token: token, idUser:user.idClient});
        }else {
            res.send({error: 'bad credentials', code:2})
        }
        console.log(token);
        return token;
    })
};

module.exports = router;