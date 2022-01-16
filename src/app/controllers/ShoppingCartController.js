const ShoppingCartModel = require("../../models/shopping-cart");
class ShoppingCartController {
  async index(req, res) {
    const listProductCart = await ShoppingCartModel.getCart(req.user.id);
    console.log(listProductCart);
    res.render("shopping-cart", {
      listProductCart: listProductCart,
      user: req.user,
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
