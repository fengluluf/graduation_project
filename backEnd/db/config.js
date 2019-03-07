const mysql = require('mysql');
//数据库连接配置
let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'health',
  port: '3306'
});

//数据库基本操作
function query(sql, callback) {
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (err, rows) {
      callback(err, rows);
      connection.release();
    })
  })
}

exports.query = query;