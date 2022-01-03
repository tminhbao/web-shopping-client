const db = require("../../configs/connect");
const nodemailer = require("nodemailer");
const randtoken = require("rand-token");

const index = (req, res) => {
  res.render("forgot", { user: req.user });
};

const handleForgotPassword = (req, res, next) => {
  const email = req.body.email;
  db.query(
    'SELECT * FROM users WHERE email ="' + email + '"',
    function (err, result) {
      if (err) throw err;

      var type = "";
      var msg = "";
      if (result[0]) {
        var token = randtoken.generate(20);
        var sent = sendEmail(email, token);

        if (sent != "0") {
          var data = {
            token: token,
          };
          db.query(
            'UPDATE users SET ? WHERE email ="' + email + '"',
            data,
            (err, result) => {
              if (err) throw err;
            }
          );
          type = "success";
          msg = "The reset password link has been sent to your email address";
        } else {
          type = "error";
          msg = "Something goes to wrong. Please try again";
        }
      } else {
        //console.log("2");
        type = "error";
        msg = "The Email is not registered with us";
      }
      req.flash(type, msg);
      res.redirect("/resetpassword");
    }
  );
};

const sendEmail = (emailX, tokenX) => {
  const email = emailX;
  const token = tokenX;
  const mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "beobeocute12341@gmail.com",
      pass: "minhbao0103",
    },
  });
  const mailOptions = {
    from: "beobeocute12341@gmail.com",
    to: email,
    subject: "Reset Password Link - beobeocute12341.com",
    html:
      '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/resetpassword?token=' +
      token +
      '">link</a> to reset your password</p>',
  };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(1);
      console.log(error);
    } else {
      console.log(0);
      console.log(info);
    }
  });
};

module.exports = { index, handleForgotPassword };
