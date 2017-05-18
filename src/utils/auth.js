var sha256 = require('sha256');
var jwt = require('jsonwebtoken');

var connection = require('../utils/dbconnection');

var compareAuthInformation = function (login, password){
    var query = 'SELECT * ' +
        'FROM ats_08.USER ' +
        'WHERE login=' + login;
    connection.connect();
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        var user = rows[0];
        return user.password === password;
    });
    connection.end();
};

var getIdByLogin = function(login){
    var query = 'SELECT * ' +
        'FROM ats_08.USER ' +
        'WHERE login=' + login;
    connection.connect();
    connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        return rows[0].idUser;
    });
    connection.end();
};

var getToken = function(){
    return 'freshToken';
};

var auth = {
    token : function(login, password){
        if (compareAuthInformation(login, password)){
            return getToken();
        }
    }
};

module.exports = auth;