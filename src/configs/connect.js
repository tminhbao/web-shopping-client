const mysql = require("mysql");
const conn = mysql.createConnection({
  // host: "db4free.net",
  // user: "minhbao",
  // password: "123456789",
  // database: "laptop_webshop",
  // charset: "utf8_general_ci",
  // port: "3306",
  // multipleStatements: true,
  host: "sql6.freemysqlhosting.net",
  user: "sql6461859",
  password: "LAbxYqUQVd",
  database: "sql6461859",
  charset: "utf8_general_ci",
  port: 3306,
  multipleStatements: true,
});
conn.connect(function (err) {
  if (err) throw err;
  console.log("Kết nối database thành công!!!");
});
module.exports = conn;
