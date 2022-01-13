const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "sql6.freemysqlhosting.net",
  user: "sql6465176",
  password: "WHlKz8F5ig",
  database: "sql6465176",
  charset: "utf8_general_ci",
  port: 3306,
  multipleStatements: true,
});
conn.connect(function (err) {
  if (err) throw err;
  console.log("Kết nối database thành công!!!");
});
module.exports = conn;
