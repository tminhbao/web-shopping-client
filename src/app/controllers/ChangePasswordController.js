const db = require("../../configs/connect");
const bcrypt = require("bcryptjs");
const index = (req, res) => {
  res.render("changepassword", { user: req.user });
};

const handleChangePassword = (req, res) => {
  const newPassword = req.query.password;
  const confirmPassword = req.query.confirmPassword;
  const user = req.user;
  const email = user.email;
  async function hashIt(password) {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
  }
  hashIt(newPassword);
  if (confirmPassword != newPassword) {
    alert("Confirm Password chưa đúng, xin mời nhập lại ");
    res.redirect("/changepassword");
  } else {
    db.query(
      `UPDATE users SET password = '${newPassword}' WHERE email = '${email}'`,
      function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
      }
    );
    res.redirect("/");
  }
};
module.exports = { index, handleChangePassword };
