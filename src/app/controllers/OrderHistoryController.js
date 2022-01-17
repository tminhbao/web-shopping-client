const ShoppingCartController = require("../../models/shopping-cart");
class OrderHistoryController {
  async index(req, res) {
    const listCheckout = await ShoppingCartController.getCheckout(req.user.id);
    res.render("orderhistory", { user: req.user, listCheckout: listCheckout });
  }
}
module.exports = new OrderHistoryController();
