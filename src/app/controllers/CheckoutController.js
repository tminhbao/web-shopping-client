class CheckoutController {
  index(req, res) {
    res.render("checkout", { user: req.user });
  }
}
module.exports = new CheckoutController();
