/**
 * Created by bahramhajian on 2016-08-17.
 */
var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
  database        : 'DB'
});

pool.getConnection(function(err, connection) {
  // connected! (unless `err` is set)
});

module.exports.pool = pool;
