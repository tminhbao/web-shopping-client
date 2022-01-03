const db = require("../../configs/connect");
class CheckoutController {
  index(req, res) {
    res.render("editinfo", { user: req.user });
  }
  changeInfo(req, res) {
    const user = req.user;
    const email = user.email;
    const updateData = req.body;
    console.log(updateData);
    db.query(
      `UPDATE users SET ? WHERE email = '${email}'`,
      updateData,
      function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
      }
    );
    res.redirect("/account");
  }
}
module.exports = new CheckoutController();
