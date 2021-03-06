const express = require("express");
const app = express();
const passport = require("passport");
const router = express.Router();
const crypto = require("crypto");
const { token } = require("morgan");

app
  .route("/login")
  .get((req, res) => res.render("login"))
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      successRedirect: "/",
    })
  );

router.get("/private", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("Welcome to private page");
  } else {
    res.send("Ban chưa login");
  }
});

// ủa sao e làm cái middleware để chặn private page đâu r
// Thí dụ a có trang xem hóa đơn, nếu ko login thì ko cho vào, chứ này e mở banh hết r :))))
