class ShoppingCartController {
  index(req, res) {
    res.render("shopping-cart", { user: req.user });
  }
}
module.exports = new ShoppingCartController();
