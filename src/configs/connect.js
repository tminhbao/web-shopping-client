const mysql = require('mysql');
const conn = mysql.createConnection({
  host: 'sql6.freemysqlhosting.net',
  user: 'sql6456787',
  password: 'VRPL3AsQP4',
  database: 'sql6456787',
  charset: 'utf8_general_ci',
  port: '3306',
  multipleStatements:true
});
conn.connect(function (err) {
  if (err)
    throw err;
  console.log('Kết nối database thành công!!!');
})
module.exports = conn;


