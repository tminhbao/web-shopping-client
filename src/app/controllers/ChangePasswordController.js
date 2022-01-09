const db = require("../../configs/connect");
const bcrypt = require("bcryptjs");
const index = (req, res) => {
  res.render("changepassword", { user: req.user });
};

const handleChangePassword = (req, res) => {
  const oldPassword = req.body.oldPassword;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const user = req.user;
  const userPassword = user.password;
  const email = user.email;

  let salt = bcrypt.genSaltSync(10);
  const oldPasswordUser = bcrypt.hashSync(oldPassword, salt);

  if (oldPasswordUser == userPassword) {
    if (confirmPassword != password) {
      console.log("Confirm Password chưa đúng, xin mời nhập lại ");
      res.redirect("/changepassword");
    } else {
      let salt = bcrypt.genSaltSync(10);
      const newPassword = bcrypt.hashSync(password, salt);
      db.query(
        `UPDATE users SET password = '${newPassword}' WHERE email = '${email}'`,
        function (err, data) {
          if (err) throw err;
          console.log(data.affectedRows + " record(s) updated");
        }
      );
      res.redirect("/");
    }
  } else {
    console.log("Mật khẩu cũ chưa đúng");
    res.redirect("/changepassword");
  }
};
module.exports = { index, handleChangePassword };
