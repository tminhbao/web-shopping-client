const ShoppingCartModel = require("../../models/shopping-cart");
class CheckoutController {
  async index(req, res) {
    const listProductCart = await ShoppingCartModel.getCart(req.user.id);
    const totalMoney = await ShoppingCartModel.getTotalMoney(req.user.id);

    // Lấy ngày tháng hiện tại
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    // Lấy thời gian hiện tại
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    const dateUpdate =
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    if (
      req.query.firstname &&
      req.query.lastname &&
      req.query.address &&
      req.query.email &&
      req.query.phone &&
      req.query.note
    ) {
      ShoppingCartModel.updateCheckout(
        dateUpdate,
        req.user.id,
        req.query.firstname,
        req.query.lastname,
        req.query.email,
        req.query.phone,
        req.query.note
      );
      res.redirect("/orderhistory");
    }

    res.render("checkout", {
      user: req.user,
      listProductCart: listProductCart,
      totalMoney: totalMoney,
    });
  }
}
module.exports = new CheckoutController();
