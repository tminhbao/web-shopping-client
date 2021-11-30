const mysql = require('mysql');
const conn = mysql.createConnection({
  host: 'sql6.freemysqlhosting.net',
  user: 'sql6454865',
  password: '7zB5KXjdxg',
  database: 'sql6454865',
  charset: 'utf8_general_ci',
  port: '3306'
});
conn.connect(function (err) {
  if (err)
    throw err;
  console.log('Success');
})
module.exports = conn;

