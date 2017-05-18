/**
 * Database connection
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'lampdev.ecam.fr',
    user     : 'ats_08',
    password : 'QTbqp94'
});

module.exports = connection;
