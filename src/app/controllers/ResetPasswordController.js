const db = require("../../configs/connect");
const bcrypt = require("bcryptjs");
const index = (req, res) => {
  res.render("resetpassword", { user: req.user });
};

const handleUpdatePassword = (req, res, next) => {
  const token = req.query.token;
  const password = req.body.password;
  db.query(
    'SELECT * FROM users WHERE token ="' + token + '"',
    (err, result) => {
      if (err) throw err;

      var type = "";
      var msg = "";
      if (result.length > 0) {
        var saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            var data = {
              password: hash,
            };

            db.query(
              'UPDATE users SET ? WHERE email ="' + result[0].email + '"',
              data,
              function (err, result) {
                if (err) throw err;
              }
            );
          });
        });
        console.log("Update password successfully");
        type = "success";
        msg = "Your password has been updated successfully";
      } else {
        console.log("Invalid link; please try again");
        type = "success";
        msg = "Invalid link; please try again";
      }
      req.flash(type, msg);
      res.redirect("/");
    }
  );
};

module.exports = { index, handleUpdatePassword };
