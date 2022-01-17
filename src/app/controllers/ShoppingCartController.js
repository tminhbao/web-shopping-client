const ShoppingCartModel = require("../../models/shopping-cart");
class ShoppingCartController {
  async index(req, res) {
    const listProductCart = await ShoppingCartModel.getCart(req.user.id);
    const totalMoney = await ShoppingCartModel.getTotalMoney(req.user.id);
    console.log(totalMoney);
    res.render("shopping-cart", {
      listProductCart: listProductCart,
      user: req.user,
      totalMoney: totalMoney,
    });
  }
  // async getProduct(req, res) {
  //   const listProduct = JSON.parse(req.query.product);
  //   listProduct.forEach((prod) => {
  //     prod.name = "laptop hello";
  //   });

  //   res.send({ message: "success", data: listProduct });
  // }
}
module.exports = new ShoppingCartController();
